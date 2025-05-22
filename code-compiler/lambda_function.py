import sys
import subprocess
import io

def execute_python_code(code):
    original_stdout = sys.stdout
    sys.stdout = output_capture = io.StringIO()
    try:
        exec(code)
        output = output_capture.getValue()
        print("out of code", output)
        return output
    except Exception as e:
        return str(e)
    finally:
        sys.stdout = original_stdout

def execute_java_code(code):
    try:
        print('this is the that we received', code)
        with open('/tmp/Main.java', 'w') as java_file:
            java_file.write(code)

        compile_result = subprocess.run(['javac', '/tmp/Main.java'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print('Compilation result: ', compile_result.returncode)
        if compile_result.returncode != 0:
            return compile_result.stderr.decode()

        run_result = subprocess.run(['java', '-classpath', '/tmp', 'Main'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        print('Run result', run_result.returncode)
        return run_result.stdout.decode()
    except Exception as e:
        return str(e)

def execute_cpp_code(code):
    try:
        print('this is the that we received', code)
        with open('/tmp/temp.cpp', 'w') as cpp_file:
            cpp_file.write(code)

        compile_result = subprocess.run(['g++', '/tmp/temp.cpp', '-o', '/tmp/temp'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print('Compilation result: ', compile_result.returncode)
        if  compile_result.returncode != 0:
            print("Hello")
            return compile_result.stderr.decode()

        run_result = subprocess.run([
            '/tmp/temp'
        ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        print('Run result', run_result.returncode)
        return run_result.stdout.decode()
    except Exception as e:
        print("Hello")
        return str(e)

def handler(event, context):
    language= event.get('language', 'python')
    code = event.get('code', '')
    if language == 'python':
        result = execute_python_code(code)
    elif language == 'java':
        result = execute_java_code(code)
    elif language == 'cpp':
        result = execute_cpp_code(code)
    else:
        result = 'Unsupported langauge'
    return {
        'statusCode': 200,
        'body': result
    }

