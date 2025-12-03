1. Python Example:
  {
    "language": "python",
    "code": "def add(a, b):\n    return a + b\n\nresult = add(5, 3)\nprint(f'Result: {result}')",
    "input": {}
  }

  2. C++ Example:
  {"language": "cpp","code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 10, b = 20;\n    int sum = a + b;\n    cout << \"Sum: \" << sum << endl;\n    return 0;\n}","input": {}}

  3. Java Example:
  {"language": "java", "code": "public class Main {\n    public static void main(String[] args) {\n        int a = 15;\n        int b = 25;\n        int sum = a + b;\n  System.out.println(\"Sum: \" + sum);\n    }\n}","input": {}}

  4. Rust Example:
  {"language": "rust","code": "fn fibonacci(n: u32) -> u32 {\n    match n {\n        0 => 0,\n        1 => 1,\n        _ => fibonacci(n - 1) + fibonacci(n - 2)\n    }\n}\n\nfn main() {\n    for i in 0..10 {\n        println!(\"fib({}) = {}\", i, fibonacci(i));\n    }\n}","input": {}}

  5. Javascript Example:
  {
    "language": "javascript",
    "code": "console.log('Hello from JavaScript!');",
    "input": {}
  }

  {
    "language": "javascript",
    "code": "async function delay(ms) {\n    return new Promise(resolve => setTimeout(resolve, ms));\n}\n\nasync function main() {\n    
  console.log('Start');\n    await delay(100);\n    console.log('After 100ms');\n    const result = [1, 2, 3].map(x => x * x);\n    
  console.log('Squares:', result);\n}\n\nmain();",
    "input": {}
  }
======================= Commands =====================
======================================================


export QUEUE_URL=redis://localhost:6380/0 && uv run main.py


docker-compose up -d

docker-compose build

docker network rm code-compiler-network

docker compose up


  6. Go - Popular for interviews
  7. C - Fundamental
  8. C# - Enterprise