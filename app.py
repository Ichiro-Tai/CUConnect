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

# creates a coupon.
def create_coupon_type(user, username):
    class_subject = request.form['businessName']
    preferred_date = request.form['description']
    preferred_hours = request.form['price_level']
    pricing = request.form['pricing']
    new_request = {
        'businessname': "test1",
        'description': "test1",
        'price_level': "test1",
    }

    db = firebase.database()
    db.child('coupontype').push(new_request, user['idToken'])
    return "hello"

# deletes a coupon. 
def delete_coupon_type(article, businessname):
    db = firebase.database()
    if db.child("coupontype").child(article).get().val()['businessname'] == businesname :
    	db.child('coupontype').child(article).remove()
    return "hello"

# creates a coupon copy.
def create_coupon_copy(username, article):
    db = firebase.database()
    new_request = {
        'businessname': db.child("coupontype").child(article).get().val()['businessname'],
        'description': db.child("coupontype").child(article).get().val()['description'],
        'price_level': db.child("coupontype").child(article).get().val()['price_level'],
	'owner': username,
	'valid': yes
    }
    db.child('couponcopy').push(new_request, user['idToken'])
    return "hello"

# invalidates a coupon copy.
def invalidate_coupon_copy(owner, article):
    db = firebase.database()
    if db.child("coupontype").child(article).get().val()['owner'] == owner :
	db.child("coupontype").child(article).update({'valid':'no'})

# creates a new request.
def create_request(username):
    class_subject = request.form['classSubject']
    preferred_date = request.form['preferredDate']
    preferred_hours = request.form['preferredHours']
    pricing = request.form['pricing']
    new_request = {
	'username': username,
        'subject': class_subject,
        'date': preferred_date,
        'hours': preferred_hours,
        'pricing': pricing,
	'active': "no",
	'contractor': ""
    }

    db = firebase.database()
    db.child('classrequest').push(new_request, user['idToken'])

#sets the contractor name (name) for an existing request (article).
def set_request_contractor(article, name) :
	db = firebase.database()
	if db.child("classrequest").child(article).get().val()['active'] == 'true' :
		db.child("classrequest").child(article).update({'active':'yes'})
		db.child("classrequest").child(article).update({'contractor':name})

#sets the request as finished.
def invalidate_request(article):
	db = firebase.database()
	db.child("classrequest").child(article).update({'active':'past'})

#returns the request as a dictionary.
def return_request(article):
	db = firebase.database()
	return db.child("classrequest").child(article).get();

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

invalidate_request("-LNc6o6I4Bz5_kQE6mm2")
