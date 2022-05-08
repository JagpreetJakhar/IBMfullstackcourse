import unittest
from translator import englishToFrench, frenchToEnglish

class TestTranslator(unittest.TestCase):
    """
    class testing module translator
    """
    def test_englishToFrench_null_input(self):
        """
        test with null input
        """
        self.assertIsNone(englishToFrench(None))

    def test_englishToFrench_hello_word(self):
        """
        test with the word 'Hello'
        """
        self.assertEqual(englishToFrench('Hello'), 'Bonjour')
        self.assertNotEqual(englishToFrench('hello'),'oui')

    def test_englishToFrench_1(self):
        """
        test function
        """
        self.assertEqual(englishToFrench('Night'), 'Nuit')

    def test_frenchToEnglish_null_input(self):
        """
        test with null input
        """
        self.assertIsNone(frenchToEnglish(None))

    def test_frenchToEnglish_hello_word(self):
        """
        test with the word 'Hello'
        """
        self.assertEqual(frenchToEnglish('Bonjour'), 'Hello')
        self.assertNotEqual(frenchToEnglish('puta'),'hello')

    def test_frenchToEnglish_1(self):
        """
        test function
        """
        self.assertEqual(frenchToEnglish('Vive la Paris'), 'Long live Paris')
unittest.main()