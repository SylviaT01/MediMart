# Import necessary libraries
import requests
from bs4 import BeautifulSoup
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def scrape_goodlife():
    url = 'https://www.goodlife.co.ke/'
    
    # Define headers with a User-Agent
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        # Send request with headers
        response = requests.get(url, headers=headers)
        
        # Check response status code
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Your scraping logic here
            
            logger.info("Successfully scraped data from %s", url)
            
            return True  # Return True or some indicator of success
            
        else:
            logger.error("Failed to retrieve data from %s. Status code: %d", url, response.status_code)
            return False  # Handle unsuccessful request
        
    except requests.exceptions.RequestException as e:
        logger.error("Error occurred during request: %s", str(e))
        return False  # Handle request exceptions

if __name__ == "__main__":
    scrape_goodlife()
