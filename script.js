
let conversations = [
    {
      role: 'system',
      content: 'You are a helpful assistant.'
    }
];

async function sendMessage(msg){
    try{
        const response = await fetch(`${process.env.API_URL}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${atob(process.env.API_KEY)}`
            },
            body: JSON.stringify(
                {
                    model: 'gpt-3.5-turbo',
                    messages: msg
                }
            )
        });

        const data = await response.json();

        console.log(data);

        let responseMessage = data.choices[0].message;

        conversations.push(responseMessage);

        console.log(conversations);
    }catch (err){
        console.error(err);
    }
}

let newMessage = {
    role: "user",
    content: "What is your name?"
}

conversations.push(newMessage);

sendMessage(conversations);
