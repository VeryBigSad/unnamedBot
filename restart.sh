#/bin/bash

echo "Stopping bot."
pm2 stop bot
echo "Waiting 10 seconds to avoid being throttled."
sleep 10s
echo "Starting bot."
pm2 start bot
