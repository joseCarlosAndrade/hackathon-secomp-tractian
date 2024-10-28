#!/usr/bin/env python

# from queries import *
import requests

from flask import Flask, request, jsonify
# import Auth

import sqlite3
# import db_handler

class FlaskServer:
    def __init__(self):
        """Initializes the main flask server"
        """
    
        FlaskServer.app = Flask(__name__)

        # adding url rules to manage callbacks for each endpoint
        self.app.add_url_rule('/', view_func=self.__root_callback, methods=["GET"])
        self.app.add_url_rule('/auth', view_func=self.__auth_callback, methods=["GET"])
        self.app.add_url_rule('/callback', view_func=self.__access_code_callback, methods=["GET"])
        self.app.add_url_rule('/stream_message', view_func=self.__stream_message, methods=["POST"])
        self.app.add_url_rule('/getOwningTournaments', view_func=self.__get_all_participating_tournaments, methods=["GET"])
        self.app.add_url_rule('/getSpaceTournaments', view_func=self.__get_space_tournaments, methods=["GET"])
        self.app.add_url_rule('/getUserInfo', view_func=self.__get_all_user_information, methods=["GET"])
        self.app.add_url_rule('/getMessages', view_func=self.__get_last_messages, methods=["GET"])

        # secret access code and auth
        self.__access_code = ""
        self.__access_token = ""
        self.__auth_handler = Auth.AuthHandler()

        # db handler
        self.__db_handler = db_handler.DataBaseHandler("acad.db")

        # challengermode api url
        self.__url = "https://publicapi.challengermode.com/graphql"

    # check server health
    def __root_callback(self):  
        return ":)", 200

    # auth
    def __auth_callback(self):
        print("generating auth url")

        # auth = Auth.AuthHandler()
        url = self.__auth_handler.generate_auth_url()
        if url == "":
            return jsonify({"status" : "error", "url" : ""})

        return jsonify({f"status" : "ok" , "url" : f"{url}"})

    # auth
    def __access_code_callback(self): # redirect callback - for development environment only
        # code param 
        print("getting access token")
        authorization_code = request.args.get('code')

        if authorization_code:
            # Print the authorization code to the console
            print(f"Authorization Code received: {authorization_code}")  # teste also
            
            self.__access_code = authorization_code
            status, token = self.__auth_handler.post_access_code(authorization_code)
            self.__access_token = token

            print("Token: ", self.__access_token)

            if status != 200:
                print("ERROR on server: status from posting access token not 200, status and message: ", status, f" {token}")
                return f"fail! status: {status}, message: {token}"

            print("[INFO] Success! token granted")

            return f"success! Authorization Code: {authorization_code}\nToken: {token}"
        else:
            return "No authorization code received", 400

    # simualate message streaming
    def __stream_message(self):
        print("streaming messages")

        try:
            from_user_name = request.args.get('from_user')
            to_user_name = request.args.get('to_user', default=None)
            msg = request.args.get('msg')
            datetime = request.args.get('datetime')
            match = request.args.get('match')

            self.__db_handler.save_message(from_user_name, to_user_name, msg, datetime, match)

            return jsonify({"status" : "ok"}), 200

        except Exception as err:
            return jsonify({"error" : err}), 400

        # push notifications function

        # save on db

    def __get_last_messages(self):

        try:
            return jsonify({"status" : "ok", "messages" : self.__db_handler.get_last_24h_messages()}), 200
        except Exception as err:
            return jsonify({"error" : err}), 400

    
    def __get_all_participating_tournaments(self):
        
        query = queryOwningTournamentsInfo

        payload = {
            "query" : query
        }

        headers = {
            "Authorization": f"Bearer {self.__access_token}",
            "Content-Type": "application/json"
        }

        # Send a GET request to the API endpoint
        response = requests.post(self.__url, headers=headers, json=payload)

        # Check if the request was successful
        if response.status_code == 200:
            print("status 200")
            # Process the response data
            data = response.json()
            return data
        else:
            # Print an error if the request failed
            return jsonify({"error" : response.text}), response.status_code
    
    def __get_space_tournaments(self):
        query = queryAllTournamentsInfo

        payload = {
            "query" : query
        }

        headers = {
            "Authorization": f"Bearer {self.__access_token}",
            "Content-Type": "application/json"
        }

        # Send a GET request to the API endpoint
        response = requests.post(self.__url, headers=headers, json=payload)

        # Check if the request was successful
        if response.status_code == 200:
            print("status 200")
            # Process the response data
            data = response.json()
            return data
        else:
            # Print an error if the request failed
            return jsonify({"error" : response.text}), response.status_code

    def __get_all_user_information(self):
        query = queryPersonalInfo

        payload = {
            "query" : query
        }

        headers = {
            "Authorization": f"Bearer {self.__access_token}",
            "Content-Type": "application/json"
        }

        # Send a GET request to the API endpoint
        response = requests.post(self.__url, headers=headers, json=payload)
        print("Token: ", self.__access_token)

        # Check if the request was successful
        if response.status_code == 200:
            print("status 200")
            # Process the response data
            data = response.json()
            return data
        else:
            # Print an error if the request failed
            return jsonify({"error" : response.text}), response.status_code

    # run!!
    def run(self):
        print("flask running on port 5000")
        self.app.run(host="0.0.0.0", port=5000)

# running for debug 
if __name__ == '__main__':
    flask_server = FlaskServer()
    flask_server.run()