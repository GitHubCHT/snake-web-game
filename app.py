from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')  # 對應 templates/index.html

if __name__ == '__main__':
    # debug 模式可自動重啟伺服器，便於開發
    app.run(debug=True)
