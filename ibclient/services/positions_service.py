from ibclient.handlers.current_positions_handler import CurrentPositionsHandler
import requests
import json

class PositionsService():

    def __init__(self):
        return None

    def get_current(self, account_id):
        print("service")
        handler = CurrentPositionsHandler(account_id)
        handler.get_positions()
        #call CurrentPositionsHandler and get's response
        #check if response is valid (each field in position is filled)
        return None

    def get_on(self, year, month, day):
        #creates DAO to pull data from database
        #checks if response is valid
        return None

    def update(self):
        #calls get_current
        #checks if response is valid
        #creates DAO
        #submits data though DAO and gets response
        return None
