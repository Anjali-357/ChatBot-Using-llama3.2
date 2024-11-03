import subprocess

prompt = "Test prompt for Llama model"
try:
    process = subprocess.Popen(
        ["//Applications/Ollama.app", "llama", "--model", "3.2"],  # Replace with actual path
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    stdout, stderr = process.communicate(input=prompt)
    if process.returncode != 0:
        print(f"Error: {stderr}")
    else:
        print(f"Output: {stdout.strip()}")
except Exception as e:
    print(f"Exception: {e}")
