from flask import Flask, render_template, jsonify
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('etl.html')

@app.route('/run-script', methods=['POST'])
def run_script():
    try:
        subprocess.run(["python", "lenga.py"], check=True)
        return jsonify({"status": "success", "message": "Script ejecutado correctamente."})
    except subprocess.CalledProcessError as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
