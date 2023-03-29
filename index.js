// index.js
const { Client, Events } = require("messenger-api.js")
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: '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',
});
const credentials = require("./fbstate.json")
const client = new Client({ online: true })

const openai = new OpenAIApi(configuration);



client.on(Events.Ready, bot => {
    console.log(`Logged as ${bot.user.username}`)
})
const messages = [
    {
        role: 'system',
        content: 'Học và tập'
    }
]


client.on(Events.MessageCreate, message => {
    if (message.isClientUser) return
    switch (message.content) {
        case "/ping":
            message.thread.send("Pong!")
            break;
        case "/mention":
            message.thread.send(`<@${message.author.id}> :3`)
            break;
        case "/help":
            message.thread.send(`/gpt đặt câu hỏi vớI chat GPT
/tkb xem thời khóa biểu`)
            break;
        case "/tkb":
            const date = new Date();
            const current_day = date.getDay();
            let content = ''
            switch (current_day) {
                case 1:
                    content = `TKB thứ 2
Chào cờ
Hóa
Lý
Tin

Hóa
Văn
Lý
Lý`
                    break;
                case 2:
                    content = `TKB thứ 3
Toán
Hóa
Văn
Lý
Anh

Sinh
Lý
Hóa
Hóa`
                    break;
                case 3:
                    content = `TKB thứ 4
GDQP
TD
Địa
Tin
Anh

Toán
Toán
Anh
Anh`
                    break;
                case 4:
                    content = `TKB thứ 5
Sinh
GDCD
Địa

Sinh
Sinh
Văn
Văn`
                    break;
                case 5:
                    content = `TKB thứ 6
TD
Anh
Toán
Toán
Sử

Toán
Toán
Anh
Anh`
                    break;
                case 6:
                    content = `TKB thứ 7
CN
Văn
Văn
SH`
                    break;
                default:
                    break;
            }
            message.thread.send(`<@${message.author.id}>
${content}`)
            break;
        default:
            const mess = message.content
            if (mess.split(' ').length > 1) {
                const [command, ...content] = mess.split(' ')
                if (command === '/gpt') {
                    message.thread.sendTyping().then()
                    messages.push({
                        role: 'user',
                        content: content.join(' ')
                    })
                    openai.createChatCompletion({
                        model: "gpt-3.5-turbo-0301",
                        messages,
                    }).then(data => message.thread.send(`<@${message.author.id}> ${data.data.choices[0].message.content}`))
                }

            }


            break;
    }
})

client.login(credentials)



