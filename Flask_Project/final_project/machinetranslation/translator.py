import os
from ibm_watson import LanguageTranslatorV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from dotenv import load_dotenv

load_dotenv()

apikey = os.environ['apikey']
url = os.environ['url']

authenticator = IAMAuthenticator(apikey)
language_translator = LanguageTranslatorV3(
    version='2018-05-01',
    authenticator=authenticator
)

language_translator.set_service_url(url)

def englishToFrench(eng_input):
    """
    translates English to french
    """
    if eng_input is None:
        return None
    translation_result = language_translator.translate(
            text=eng_input,model_id='en-fr').get_result()
    fr_output = translation_result['translations'][0]['translation']
    return fr_output


def frenchToEnglish(fr_input):
    """
    translates french to english """
    if fr_input is None:
        return None
    translation_result = language_translator.translate(
            text=fr_input,
            model_id='fr-en').get_result()
    eng_output = translation_result['translations'][0]['translation']
    return eng_output

