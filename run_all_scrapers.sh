#!/bin/bash

# Run all three scrapers simultaneously and save logs separately

# Create Logs directory if it doesn't exist
mkdir -p Logs

# Run the main site scraper
nohup node ./realestate.js >> Logs/$(date +"%Y-%m-%d")_hub_scraper.log 2>&1 &

# Run the new site scraper
nohup node ./realestate_dd.js >> Logs/$(date +"%Y-%m-%d")_dd_scraper.log 2>&1 &

# Run the living site scraper
nohup node ./realestate_living.js >> Logs/$(date +"%Y-%m-%d")_living_scraper.log 2>&1 &

# Inform the user that the scrapers are running
echo "All scrapers are now running in the background. Logs are being saved in the Logs directory with timestamped filenames."

# Kill command
# pkill -f realestate.js
# pkill -f realestate_dd.js
# pkill -f realestate_living.js