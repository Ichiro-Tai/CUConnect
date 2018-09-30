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
    return render_template('index.html', logged_in=False)


@app.route('/login')
def login():
    return render_template('login.html', logged_in=False)


@app.route('/student_personal')
def student_personal():
    return render_template('student_personal.html', logged_in=True)


@app.route('/family_personal')
def family_personal():
    return render_template('family_personal.html', logged_in=True)


@app.route('/business_personal')
def business_personal():
    return render_template('business_personal.html', logged_in=True)


@app.route('/rewards')
def rewards():
    return render_template('rewards.html', logged_in=False)


@app.route('/redeem_rewards')
def redeem_rewards():
    return render_template('redeem_rewards.html', logged_in=True)


@app.route('/view_rewards')
def view_rewards():
    return render_template('view_rewards.html', logged_in=True)


@app.route('/register')
def register():
    return render_template('register.html', logged_in=False)


@app.route('/view_applicants')
def view_applicants():
    return render_template('view_applicants.html', logged_in=True)


@app.route('/edit_coupons')
def edit_coupons():
    return render_template('edit_coupons.html', logged_in=True)    


@app.route('/canvas')
def canvas():
    return render_template('canvas.html', logged_in=True)
