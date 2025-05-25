import re

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

def is_code_safe(code: str, language: str) -> (bool, str):
    """ Scans code for blocked patterns. Returns (True/False, offending_pattern). """
    patterns = []
    if language == "python":
        patterns = PYTHON_BLOCKED_PATTERNS
    elif language == "java":
        patterns = JAVA_BLOCKED_PATTERNS
    elif language == "cpp":
        patterns = CPP_BLOCKED_PATTERNS

    for pat in patterns:
        if re.search(pat, code, re.IGNORECASE):
            return False, pat
    return True, ""

def static_code_scan(code: str, language: str) -> None:
    safe, pattern = is_code_safe(code, language)
    if not safe:
        raise ValueError(f"Code contains dangerous pattern: {pattern}")