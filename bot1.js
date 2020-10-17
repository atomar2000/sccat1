const { kMaxLength } = require('buffer');
const { PRIORITY_ABOVE_NORMAL } = require('constants');
const Discord = require('discord.js')
const client = new Discord.Client()

var PREFIX = '.';
var server_region = "india"
var server_code = "XXXXXX"

client.on('ready', () => {
    console.log('connected as ' + client.user.tag)
})

client.on('message', msg => {
    if(msg.author == client.user){
        return
    }
    if(msg.content.startsWith('.')){
        processmessage(msg)
    }
})


function amongushelp(msg, primarycommand, arguments){
    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('help amongus! :) ')
        .setDescription('these are the commands currently operational other commands will be added with updates :v:')
        .setThumbnail('https://img.icons8.com/nolan/452/among-us.png')        
        .addFields(
            {name: 'for updating server info :point_down:', value: 'user `.cserver` to update value of the server region and server code \n use `.server` to get info regarding the current server'},
            {name: 'NOTE', value: 'dont go to the electrical alone! :)'}
        )
        .setFooter('i was created by master cicadA')
        msg.channel.send(embed)
}

//add permissions to this

function rolefunction(msg , primarycommand, arguments){
    if(arguments[1] != arguments[5] && arguments[2] != arguments[5] && arguments[3] != arguments[5]){
        guild.roles.create({
            data: {
              name: arguments[1],
              color: arguments[2],
            },
            reason: arguments[3],
          })
            .then(console.log)
            .catch(console.error);
            msg.reply('the role was created succesfully')
        }
    else{
        msg.reply('please check the correct syntax using **.how role**') //.how role not yet created
    }
}

//create hirearchy of permission right now its hard coded

// unfinished funtion for roles!

//reminder how left
function howreply(msg, primarycommand, arguments){
    //invite works => send the link to ther server to accept
    //asking for permission missing(admin only)//update permission tick
    if(arguments[0] == "invite" && msg.member.roles.cache.find(role => role.name === "admin")){        
        msg.channel.createInvite()
            .then(invite => msg.reply(`share this invite code with your friend.\n **${invite}**`))
            .catch(console.error)
    }
    else if(arguments[0] == "invite"){
        msg.reply("you currently dont have the permission to invite someone")
    }
    //doesnt actually ban anyone right now but the below part is completed
    else if(arguments[0] == 'ban'){
        if(msg.member.hasPermission('BAN_MEMBERS')){
            msg.reply('use `.ban [member_name]`')
        }
        else{
            msg.reply('you currently dont have the permission to ban someone from the server \n to check permissions you can use !permissions')
            //check [permission] not yet completed
        }
    }
    //this part is completed the funtionality is not yet implemented
    else if(arguments[0] == 'kick'){
        if(msg.member.hasPermission('KICK_MEMBERS')){
            msg.reply('use `.kick [member_name]`')
        }
        else{
            msg.reply('you currently dont have the permission to kick someone from the server \n to check permissions you can use !permissions')
        }
    }
    else if(arguments == "countdown" || arguments[0] == "countdown"){
        msg.reply("the format to use the command is `.countdown [hrs] [mins] [secs] [message(optional)]`")
    }
    else if(arguments[0] == "role"){
        msg.reply("try writing in `.role create [role_name]`")
    }
    else if(arguments[0] == "introduce"){
        msg.reply("try writing `.introduce [blank or [your_username]]`")
    }
    else if(arguments[0] == "introduceserver"){
        introduceServer()
    }    
    else if(arguments[0] == "cserver"){
        msg.reply("try writing `.cserver [server_region] [server_code]`")
    }
    else if(arguments[0] == "amongus"){
        amongushelp(msg, primarycommand, arguments)
    }
}

//ban/kick members
function servercheck(msg, primarycommand, arguments){
    if(server_code == "XXXXXX"){
        msg.reply("the server details has not been updated yet, use `.cserver` command to update the details.")
    }
    else{
        const embed = new Discord.MessageEmbed()
        .setTitle("SERVER DETAILS:")
        .setColor("RANDOM")
        .setThumbnail('https://media1.tenor.com/images/b4504ea1880c999016d40dc01d6ff7e9/tenor.gif?itemid=18355819')
        .addField("Region:", `${server_region}`, true)
        .addField("code:", `${server_code}`, true)
        msg.channel.send(embed)
    }
}

function cserver(msg, primarycommand, arguments){
    if(arguments[0] == arguments[1]){
        msg.reply("check out `.how cserver` for the correct usage of the command :) ")
    }
    else{
        server_region = arguments[0]
        server_code = arguments[1]
        msg.reply("server details updated succesfully")
    }
}

function banmember (msg, primarycommand, arguments){
    const user = getUserFromMention(arguments[0])    
    if (msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
            try {
                msg.guild.member(user).ban();
            } catch {
                msg.reply("I do not have permissions to kick, plz ask the admin to provide me the permission to ban someone " + user);
        }
    }
        else {
            msg.reply("You do not have permissions to ban" + user);
    }
}


//kick
async function kickmember (msg, primarycommand, arguments){
    const user = getUserFromMention(arguments[0])    
    if (msg.guild.member(msg.author).hasPermission("KICK_MEMBERS")) {            
              await msg.guild.member(user).kick()
              .catch(err => console.error(err))
    }
        else {
            msg.reply("You do not have permissions to kick " + user);
    }
}



//working about mentions
function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}


//.introduce(embed) [self-intoduction completed]

function introduction(msg, primarycommand, arguments){
    console.log(arguments)
    if(arguments[0] == arguments[10]){
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('hello! im sccat1 :sunglasses:')
        .setDescription('im here to help you out with server tasks & also help you out to the best of my capabilities :v:')
        .setThumbnail('https://gamepedia.cursecdn.com/honkaiimpact3_gamepedia_en/f/f2/Schrodinger_(Back).png?version=b685697cd5f407554cb934fc35968fa9')        
        .addFields(
            {name: 'here are some things that i can do flawlessly :point_down:', value: 'ban, kick, countdown, introduce someone, and much more..'},
            {name: 'stuck?', value: 'if you get stuck just use **.how** in front of the command to get help \n Ex: `.how introduce`'},
            {name: 'among us?', value: 'for info regarding amongus commands use `.how amongus`'}
        )
        .setImage('https://buffer.com/library/content/images/library/wp-content/uploads/2016/06/giphy.gif')
        .setFooter('i was created by master cicadA')
        msg.channel.send(embed)
    }
    else{
        const user = getUserFromMention(arguments[0])
        if(typeof user === "undefined"){
            msg.reply('the user was not found :interrobang:')
        }
        else {
            //let member = msg.mentions.users.first()
            console.log(msg.guild.member(user).roles)
            const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`:point_right: this guy likes to call himself ${user.username}`)
            .addField('Roles:', msg.guild.member(user).roles.cache.map(r => `${r}`).join(' | '), true)
            .setThumbnail( user.avatarURL())                 
            //.addField("Game:", `${msg.member.presence.game ? msg.member.presence.game.name : 'None'}`, true)
            .addField("Joined The Server On:", `${(msg.guild.member(user).joinedAt)}`, true)
            //.setImage('')
            //.setFooter('')
            msg.channel.send(embed)
        }
    }
    
}

 
//.countdown [] hrs [] mins [] secs msg (completely functional)
function countdown(msg, primarycommand, arguments){
    let count = 0
    let splitmsg = arguments
    let greet = arguments.slice(3)
    let greets = ""
    console.log(greet)
    greets += "⏰"
    for(var i in greet){
        greets += greet[i]
        greets += " "
    }
    greets += "⏰"
    if(arguments[0] == arguments[4]) {
        howreply(msg, primarycommand, "countdown");
    }
    else if(arguments){
        msg.channel.send(`countdown set for ${arguments[0]}hrs ${arguments[1]}mins ${arguments[2]}secs :thumbsup:`)
        if(arguments[3]){
            setTimeout(function(){ msg.channel.send(greets); }, splitmsg[0]*60*60*1000+splitmsg[1]*60*1000+splitmsg[2]*1000)
        }
        else{
            setTimeout(function(){ msg.channel.send("⏰⏰time up!⏰⏰ @" + msg.author.username); }, splitmsg[0]*60*60*1000+splitmsg[1]*60*1000+splitmsg[2]*1000)
        }
    }
}

function processmessage(msg){
    let fullcommand = msg.content.substr(1)
    let splitcommand = fullcommand.split(" ")
    let primarycommand = splitcommand[0]
    let arguments = splitcommand.slice(1)

    if(primarycommand == "hello"){
        msg.channel.send(`hello! ${msg.author}`)
    }
    else if(primarycommand == "avatarUrl"){
        msg.reply(msg.author.displayAvatarURL())
    }
    else if(primarycommand == "rules"){
        msg.reply('rules: \n there are no rules')
    }
    else if(primarycommand == "role"){
        rolefunction(msg, primarycommand, arguments)
    }
    else if(primarycommand == "how"){
        howreply(msg, primarycommand, arguments)
    }
    else if(primarycommand == "countdown"){
        countdown(msg, primarycommand, arguments)
    }
    //create check(for checking various things)
    //create ban and kick
    //working on ban and kick
    else if(primarycommand == "ban"){
        banmember(msg, primarycommand, arguments)
    }
    else if(primarycommand == "kick"){
        kickmember(msg, primarycommand, arguments)
    }
    else if(primarycommand == "introduce" || primarycommand == "help" ){
        introduction(msg, primarycommand, arguments)
    }
    else if(primarycommand == "members"){
        console.log(msg.guild.members)
    }
    else if(primarycommand == "server"){
        servercheck(msg, primarycommand, arguments)
    }
    else if(primarycommand == "cserver"){
        cserver(msg, primarycommand, arguments)
    }
    

}



client.login(process.env.token)
