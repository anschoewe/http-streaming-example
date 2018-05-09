This is a very simple nodejs application that streams the current time in the response, every second.

When the request comes in for each client, the first chunk of data sent back in the response is 1024 bytes of random data (happnes to be zeros).  This is because some browsers have a quirk that they don't rrender the data froma streamed/chunked response until they receive 1KB of data.  The amount varies by browser -as documented here: https://stackoverflow.com/questions/16909227/using-transfer-encoding-chunked-how-much-data-must-be-sent-before-browsers-s/16909228#16909228

After this initial chunk is sent, the current time is pushed every second.
