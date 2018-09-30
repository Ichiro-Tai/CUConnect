from flask import (
    Flask, render_template
)

app = Flask(__name__)


def render_page(html):
    with open(html, 'w+') as file:
        file.write(render_template(html))
    return render_template(html)


@app.route('/')
def index():
    return render_page('index.html')


@app.route('/login')
def login():
    return render_page('login.html')


@app.route('/personal')
def personal():
    return render_page('personal.html')


@app.route('/rewards')
def rewards():
    return render_page('rewards.html')


@app.route('/aboutus')
def aboutus():
    return render_page('aboutus.html')
