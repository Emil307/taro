import requests
from django.conf import settings


def send_to_telegram(message):
    apiToken = settings.TELEGRAM_TOKEN
    chatID = settings.TELEGRAM_CHAT_ID
    apiURL = f'https://api.telegram.org/bot{apiToken}/sendMessage'

    try:
        response = requests.post(apiURL, json={'chat_id': chatID, 'text': str(message)})
        print(response.text)
        return response
    except Exception as e:
        print(e)    
    