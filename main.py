from flask import (
    Flask, render_template
)

app = Flask(__name__)


def render_page(html):
    # with open(html, 'w+') as file:
    #     file.write(render_template(html))
    return render_template(html)


@app.route('/')
def index():
    return render_page('index.html')


@app.route('/login')
def login():
    return render_page('login.html')


@app.route('/student_personal')
def student_personal():
    return render_page('student_personal.html')


@app.route('/family_personal')
def family_personal():
    return render_page('family_personal.html')


@app.route('/business_personal')
def business_personal():
    return render_page('business_personal.html')


@app.route('/rewards')
def rewards():
    return render_page('rewards.html')


@app.route('/aboutus')
def aboutus():
    return render_page('aboutus.html')


@app.route('/register')
def register():
    return render_page('register.html')


@app.route('/canvas')
def canvas():
    return render_page('canvas.html')
