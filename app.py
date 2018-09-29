#! /usr/bin/env python
# -*- coding: UTF-8 -*-
#

import pyrebase
import util
from flask import (
    Flask, render_template, request, url_for, redirect
)

firebase_config = {
    'apiKey': "AIzaSyCUvNXJe59dLzsABshpgBsV_G-SE4-Bel4",
    'authDomain': "cuconnect-72aa4.firebaseapp.com",
    'databaseURL': "https://cuconnect-72aa4.firebaseio.com",
    'projectId': "cuconnect-72aa4",
    'storageBucket': "cuconnect-72aa4.appspot.com",
    'messagingSenderId': "120156024875"
}

firebase = pyrebase.initialize_app(firebase_config)

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/create_request', methods=['POST'])
def create_request():
    class_subject = request.form['classSubject']
    preferred_date = request.form['preferredDate']
    preferred_hours = request.form['preferredHours']
    pricing = request.form['pricing']
    new_request = {
        'subject': class_subject,
        'date': preferred_date,
        'hours': preferred_hours,
        'pricing': pricing
    }

    auth = firebase.auth()
    username = 'test@example.com'
    password = 'TestTestTest'
    user = auth.sign_in_with_email_and_password(username, password)

    db = firebase.database()
    # db.child('classrequest').push(new_request, user['idToken'])
    util.push_to_db(db, user, new_request)
    return "hello"


@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    auth = firebase.auth()
    user = auth.sign_in_with_email_and_password(username, password)
    print(auth.get_account_info(user['idToken']))
    return redirect(url_for('personal_page'))


@app.route('/personal', methods=['GET'])
def personal_page():
    return render_template('family_personal.html')
