import sys
import subprocess
import io
import re
import os
import signal
from contextlib import contextmanager
import tempfile
import shutil

# Security configurations
MAX_EXECUTION_TIME = 30  # seconds
MAX_OUTPUT_SIZE = 10000  # characters
MAX_CODE_SIZE = 50000    # characters

# Dangerous patterns to block
PYTHON_BLOCKED_PATTERNS = [
    r'import\s+os',
    r'import\s+sys',
    r'import\s+subprocess',
    r'import\s+socket',
    r'from\s+os\s+import',
    r'from\s+sys\s+import',
    r'from\s+subprocess\s+import',
    r'from\s+socket\s+import',
    r'__import__',
    r'eval\s*\(',
    r'exec\s*\(',
    r'compile\s*\(',
    r'open\s*\(',
    r'file\s*\(',
    r'input\s*\(',
    r'raw_input\s*\(',
    r'execfile\s*\(',
    r'reload\s*\(',
    r'__builtins__',
    r'globals\s*\(',
    r'locals\s*\(',
    r'vars\s*\(',
    r'dir\s*\(',
    r'hasattr\s*\(',
    r'getattr\s*\(',
    r'setattr\s*\(',
    r'delattr\s*\(',
    r'isinstance\s*\(',
    r'issubclass\s*\(',
    r'callable\s*\(',
    r'exit\s*\(',
    r'quit\s*\(',
]

JAVA_BLOCKED_PATTERNS = [
    r'import\s+java\.io\.',
    r'import\s+java\.nio\.',
    r'import\s+java\.net\.',
    r'import\s+java\.lang\.Process',
    r'import\s+java\.lang\.Runtime',
    r'Runtime\.getRuntime',
    r'ProcessBuilder',
    r'System\.exit',
    r'System\.getProperty',
    r'System\.setProperty',
    r'File\s*\(',
    r'FileReader',
    r'FileWriter',
    r'FileInputStream',
    r'FileOutputStream',
    r'Socket\s*\(',
    r'ServerSocket',
    r'URL\s*\(',
    r'URLConnection',
    r'Class\.forName',
    r'Thread\s*\(',
    r'Runnable',
]

CPP_BLOCKED_PATTERNS = [
    r'#include\s*<fstream>',
    r'#include\s*<filesystem>',
    r'#include\s*<cstdlib>',
    r'#include\s*<unistd\.h>',
    r'#include\s*<sys/',
    r'#include\s*<netinet/',
    r'#include\s*<arpa/',
    r'system\s*\(',
    r'exec[lv]p?\s*\(',
    r'fork\s*\(',
    r'popen\s*\(',
    r'fopen\s*\(',
    r'freopen\s*\(',
    r'remove\s*\(',
    r'rename\s*\(',
    r'exit\s*\(',
    r'abort\s*\(',
    r'getenv\s*\(',
    r'putenv\s*\(',
    r'setenv\s*\(',
]

class TimeoutError(Exception):
    pass

@contextmanager
def timeout(seconds):
    def timeout_handler(signum, frame):
        raise TimeoutError(f"Code execution timed out after {seconds} seconds")
    
    old_handler = signal.signal(signal.SIGALRM, timeout_handler)
    signal.alarm(seconds)
    try:
        yield
    finally:
        signal.alarm(0)
        signal.signal(signal.SIGALRM, old_handler)

def validate_code_safety(code, language):
    """Check if code contains dangerous patterns"""
    if len(code) > MAX_CODE_SIZE:
        raise ValueError(f"Code size exceeds maximum limit of {MAX_CODE_SIZE} characters")
    
    patterns = []
    if language == 'python':
        patterns = PYTHON_BLOCKED_PATTERNS
    elif language == 'java':
        patterns = JAVA_BLOCKED_PATTERNS
    elif language == 'cpp':
        patterns = CPP_BLOCKED_PATTERNS
    
    for pattern in patterns:
        if re.search(pattern, code, re.IGNORECASE):
            raise ValueError(f"Code contains potentially dangerous operation: {pattern}")
    
    return True

def truncate_output(output):
    """Truncate output if it exceeds maximum size"""
    if len(output) > MAX_OUTPUT_SIZE:
        return output[:MAX_OUTPUT_SIZE] + "\n... (output truncated)"
    return output

def execute_python_code(code):
    """Execute Python code in a restricted environment"""
    validate_code_safety(code, 'python')
    
    # Create restricted globals
    restricted_globals = {
        '__builtins__': {
            'print': print,
            'len': len,
            'str': str,
            'int': int,
            'float': float,
            'bool': bool,
            'list': list,
            'dict': dict,
            'tuple': tuple,
            'set': set,
            'range': range,
            'enumerate': enumerate,
            'zip': zip,
            'map': map,
            'filter': filter,
            'sum': sum,
            'min': max,
            'max': min,
            'abs': abs,
            'round': round,
            'sorted': sorted,
            'reversed': reversed,
            'all': all,
            'any': any,
            'chr': chr,
            'ord': ord,
            'hex': hex,
            'oct': oct,
            'bin': bin,
            'pow': pow,
            'divmod': divmod,
        }
    }
    
    original_stdout = sys.stdout
    sys.stdout = output_capture = io.StringIO()
    
    try:
        with timeout(MAX_EXECUTION_TIME):
            exec(code, restricted_globals, {})
        output = output_capture.getvalue()
        return truncate_output(output)
    except TimeoutError as e:
        return f"Error: {str(e)}"
    except Exception as e:
        return f"Error: {str(e)}"
    finally:
        sys.stdout = original_stdout

def execute_java_code(code):
    """Execute Java code with safety checks"""
    validate_code_safety(code, 'java')
    
    # Create temporary directory for this execution
    temp_dir = tempfile.mkdtemp()
    
    try:
        java_file_path = os.path.join(temp_dir, 'Main.java')
        class_file_path = os.path.join(temp_dir, 'Main.class')
        
        with open(java_file_path, 'w') as java_file:
            java_file.write(code)
        
        # Compile with timeout
        with timeout(MAX_EXECUTION_TIME):
            compile_result = subprocess.run(
                ['javac', java_file_path], 
                stdout=subprocess.PIPE, 
                stderr=subprocess.PIPE,
                timeout=15,
                cwd=temp_dir
            )
            
        if compile_result.returncode != 0:
            return f"Compilation Error: {compile_result.stderr.decode()}"
        
        # Run with timeout and resource limits
        with timeout(MAX_EXECUTION_TIME):
            run_result = subprocess.run(
                ['java', '-Xmx128m', '-classpath', temp_dir, 'Main'], 
                stdout=subprocess.PIPE, 
                stderr=subprocess.PIPE,
                timeout=15,
                cwd=temp_dir
            )
            
        if run_result.returncode != 0:
            return f"Runtime Error: {run_result.stderr.decode()}"
            
        return truncate_output(run_result.stdout.decode())
        
    except TimeoutError as e:
        return f"Error: {str(e)}"
    except subprocess.TimeoutExpired:
        return "Error: Code execution timed out"
    except Exception as e:
        return f"Error: {str(e)}"
    finally:
        # Clean up temporary directory
        shutil.rmtree(temp_dir, ignore_errors=True)

def execute_cpp_code(code):
    """Execute C++ code with safety checks"""
    validate_code_safety(code, 'cpp')
    
    # Create temporary directory for this execution
    temp_dir = tempfile.mkdtemp()
    
    try:
        cpp_file_path = os.path.join(temp_dir, 'temp.cpp')
        executable_path = os.path.join(temp_dir, 'temp')
        
        with open(cpp_file_path, 'w') as cpp_file:
            cpp_file.write(code)
        
        # Compile with timeout and security flags
        with timeout(MAX_EXECUTION_TIME):
            compile_result = subprocess.run([
                'g++', 
                '-std=c++17',
                '-Wall',
                '-Wextra', 
                '-O2',
                '-fstack-protector-strong',
                '-D_FORTIFY_SOURCE=2',
                cpp_file_path, 
                '-o', executable_path
            ], stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=15)
            
        if compile_result.returncode != 0:
            return f"Compilation Error: {compile_result.stderr.decode()}"
        
        # Run with timeout and resource limits
        with timeout(MAX_EXECUTION_TIME):
            run_result = subprocess.run([
                executable_path
            ], stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=15, cwd=temp_dir)
            
        if run_result.returncode != 0:
            return f"Runtime Error: {run_result.stderr.decode()}"
            
        return truncate_output(run_result.stdout.decode())
        
    except TimeoutError as e:
        return f"Error: {str(e)}"
    except subprocess.TimeoutExpired:
        return "Error: Code execution timed out"
    except Exception as e:
        return f"Error: {str(e)}"
    finally:
        # Clean up temporary directory
        shutil.rmtree(temp_dir, ignore_errors=True)

def handler(event, context):
    """Main Lambda handler with input validation"""
    try:
        # Validate input
        if not isinstance(event, dict):
            return {
                'statusCode': 400,
                'body': 'Invalid input: event must be a dictionary'
            }
        
        language = event.get('language', '').lower().strip()
        code = event.get('code', '')
        
        # Validate language
        supported_languages = ['python', 'java', 'cpp']
        if language not in supported_languages:
            return {
                'statusCode': 400,
                'body': f'Unsupported language. Supported languages: {", ".join(supported_languages)}'
            }
        
        # Validate code
        if not code or not isinstance(code, str):
            return {
                'statusCode': 400,
                'body': 'Invalid input: code must be a non-empty string'
            }
        
        # Execute code based on language
        if language == 'python':
            result = execute_python_code(code)
        elif language == 'java':
            result = execute_java_code(code)
        elif language == 'cpp':
            result = execute_cpp_code(code)
        
        return {
            'statusCode': 200,
            'body': result
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Internal server error: {str(e)}'
        }