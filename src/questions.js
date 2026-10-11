// Original editorial content. A = all ages; K = kids+; T = tweens+;
// N = teens+; U = adults. Work suffixes select a particular context.
// Friends: L = laughs, B = balanced, D = deep. Stable IDs preserve saved cards.
export const modes = {
  family: { name: 'Family Time', icon: '🏡', color: 'sage', description: 'Little ones, big stories. Bring every generation to the table.', invitation: 'Make a little family magic', filterLabel: 'Who’s joining?', filters: [['all','All Ages'],['kids','Kids (5–9)'],['tweens','Tweens (10–12)'],['teens','Teens (13–17)'],['adults','Adults']], categories: [['laugh','😂','Laugh Out Loud','A little silly. A lot of laughter.'],['imagine','💭','Imagine That!','Let your imagination wander.'],['heart','❤️','Heart to Heart','Small questions, closer connections.'],['stories','📖','Family Stories','The stories only your family can tell.'],['big','🌎','Big Questions','Explore the world together.'],['faith','✝️','Faith & Values','Christian reflections, chosen by you.']] },
  friends: { name: 'Friends & Gatherings', icon: '🎉', color: 'coral', description: 'Old friends, new discoveries. Turn “how’ve you been?” into more.', invitation: 'Find your next conversation', filterLabel: 'Set the mood', filters: [['laughs','Just for Laughs'],['both','A Little of Both'],['deep','Let’s Go Deep']], categories: [['rather','⚖️','Would You Rather?','Two choices. Plenty to talk about.'],['debates','🤣','Ridiculous Debates','Strong opinions, wonderfully low stakes.'],['whatif','🚀','What If?','Leave ordinary at the door.'],['confessions','🤭','Confessions & Surprises','The little things nobody would guess.'],['deep','🌙','Deep Conversations','Take the conversation a little further.'],['memories','📸','Throwbacks & Memories','Good stories deserve another telling.']] },
  work: { name: 'Work & Teams', icon: '💼', color: 'blue', description: 'Meet the people behind the job titles. A little connection goes a long way.', invitation: 'Bring your team together', filterLabel: 'What’s the setting?', filters: [['all','All Work Settings'],['new','New Teams'],['established','Established Teams'],['retreat','Team Retreats'],['leadership','Leadership Groups']], categories: [['ice','🧊','Quick Icebreakers','An easy way to say hello.'],['laugh','😄','Laugh Together','Give the meeting a lighter moment.'],['know','👋','Get to Know You','Discover the person behind the role.'],['connect','🤝','Team Connections','Build understanding, one question at a time.'],['grow','🌱','Reflect & Grow','Make room for learning.'],['future','🚀','Future Possibilities','A little space for big ideas.']] }
};
const bank = {
family: {
laugh: `A|Your socks have started a band. What is their first song called?
A|A squirrel is in charge of your birthday party. What goes wrong first?
A|Which sound should replace a doorbell to make visitors smile?
A|Give the person beside you a friendly title fit for a very silly kingdom.
A|Your shadow gets one day off. Where does it go?
A|What would a very polite monster say before eating your homework?
A|The fridge is writing a diary. What does today’s entry say?
A|What is the least useful superpower that would still be fun to have?
A|Everyone invent a new greeting using only their eyebrows. What does yours mean?
A|Which vegetable would be the worst babysitter, and why?
A|What would a football match look like if the ball sneezed every minute?
A|A Pokémon-like creature that folds laundry moves in. What funny habit does it have?
K|What should a giraffe wear to a fancy picnic?
K|A pancake wants to become a hat. How would you help it?
T|Which household chore deserves dramatic sports commentary?
T|Design a hawker stall run by penguins. What is their signature dish?
N|Your phone’s autocorrect becomes your spokesperson. What does it accidentally announce?
N|What completely ordinary activity would look funniest in slow motion?
U|Which grown-up responsibility would improve most with a clown nose?
U|What would your childhood self find funniest about your life now?`,
imagine: `A|Build a playground in the clouds. What is the first thing everyone tries?
A|A tiny door appears in a tree. What do you hope is behind it?
A|What could a backpack do that would make every adventure better?
A|Choose a room in the house to turn into a secret world. What lives there?
A|A friendly dragon needs a job in your neighbourhood. What suits it?
A|Everyone adds one feature to a family spaceship. What does yours do?
A|What would you put in a museum of things that have not been invented yet?
A|The moon invites you for lunch. What do you bring?
A|A bus can travel through dreams. Where should the first stop be?
A|What would a garden grow besides plants in your imaginary world?
A|Invent a pet that combines two things you love. How do you care for it?
A|You get to name a new colour. What does it look like, and what is it called?
K|Where would a slide starting at your bedroom window end?
K|What would you teach a talking puddle?
T|Design a train station for mermaids. How do passengers board?
T|A Star Wars-style friendly robot joins your family. What helpful trick do you teach it?
N|What one everyday rule would work differently in a city you designed?
N|Tell us about an invention that helps people feel less lonely.
U|Which lost childhood place would you recreate for one afternoon?
U|Imagine a holiday that celebrates something overlooked. How would families spend it?`,
heart: `A|What small thing did someone do recently that made you feel welcome?
A|How can you tell when someone needs a little encouragement?
A|What is a kind thing we could do together this week?
A|Which place makes you feel calm, and what is special about it?
A|Tell the person next to you one small thing you appreciate about them.
A|What helps you try again when something feels tricky?
A|When has sharing something made it more enjoyable?
A|What would you put in a care package for a friend having a boring day?
A|Which part of your day would you like someone to ask about?
A|What does a really good apology sound like to you?
A|Name a little achievement you are proud of, even if nobody noticed.
A|What is one way our family can make a new visitor feel included?
K|What makes you feel brave when you try something new?
K|Which feeling would you draw as a colour today?
T|When did someone listen to you in a way that felt good?
T|What can a friend do when you need quiet instead of advice?
N|How would you like people to celebrate your effort, even when the result is imperfect?
N|Which kind of kindness is easy to miss?
U|What have you learned about caring for people from someone younger than you?
U|What ordinary family moment would you happily bottle up and keep?`,
stories: `A|Which family meal comes with a story that deserves retelling?
A|What is the funniest misunderstanding you can remember?
A|Tell us how you learned to do something you now find easy.
A|Which family saying would confuse someone hearing it for the first time?
A|What is a favourite memory involving rain?
A|Which object in our home has the best story behind it?
A|Describe an outing that did not go to plan but became a good memory.
A|What did you love doing before screens were part of the activity?
A|Everyone share one memory of the same place. What different details do we remember?
A|What was the first thing you saved up to buy?
A|Which smell takes you straight to a happy memory?
A|Tell us about a time a small surprise made an ordinary day special.
K|What is the best make-believe adventure you have had?
K|Which story do you like hearing about when you were smaller?
T|What playground invention or schoolyard craze do you remember best?
T|Which trip on an MRT, train or bus turned into an adventure?
N|What tradition would you like to update while keeping its heart?
N|Which school experience taught you something outside the lessons?
U|What did a grandparent or older neighbour teach you that you still use?
U|Which family story would you like the next generation to know, and why?`,
big: `A|What makes a place feel like home, besides the building?
A|Should being fair always mean giving everyone the same thing?
A|What is something small that can make a whole day better?
A|How would you welcome someone who speaks a language you do not know?
A|What should people be able to borrow from a library besides books?
A|Which creature would you like humans to understand better?
A|What makes a promise worth keeping?
A|How do you decide when to take turns and when to work together?
A|Everyone name one thing a happy neighbourhood needs. Why did you choose yours?
A|What is worth taking your time over?
A|What can we learn from a person who likes different things from us?
A|How would you explain friendship to a visitor from another planet?
K|What would help a shy toy join the other toys at playtime?
K|When is asking for help a brave thing to do?
T|How would you make a playground fun for people of different ages and abilities?
T|What part of Singapore, or your own hometown, would you want a future child to enjoy?
N|When might changing your mind be a sign of strength?
N|Which everyday choice lets you make the world a little better?
U|What does success mean to you now that it did not mean when you were younger?
U|Which convenience would you give up to protect something you value?`,
faith: `A|What ordinary thing could we thank God for today?
A|How might we show the kindness of the Good Samaritan in our neighbourhood?
A|What would you ask Jesus about welcoming people who feel left out?
A|Which part of creation makes you curious or grateful?
A|What is one small way to put “love your neighbour” into practice this week?
A|When you hear that faith can be like a mustard seed, what do you imagine?
A|What could our family pray about together, if everyone feels comfortable sharing?
A|How can we be gentle with someone who has made a mistake?
A|Which Bible story would you like to step into for a conversation?
A|What might courage look like in an ordinary school or work day?
A|Everyone name a quiet blessing that can be easy to overlook.
A|How could we make our next meal a moment of gratitude?
K|What kind thing would you put in a thank-you drawing for God?
K|What do you think a peaceful day with Noah’s animals would look like?
T|What might David’s courage teach us when a task looks too big?
T|How could you help a friend feel loved without making a big announcement?
N|What question about faith would you like space to explore without rushing?
N|How can forgiveness and healthy boundaries fit together?
U|Which Christian value has become more practical to you with experience?
U|What helps you make room for prayer or reflection during a busy season?`
},
friends: {
rather: `L|Would you rather have dramatic entrance music everywhere or a tiny round of applause after every task?
L|Would you rather share a flat with a tidy giant or a messy wizard?
L|Choose your inconvenience: shoes that squeak compliments or a jacket that announces the weather.
L|Would you rather be famous for a spectacular sandwich or an extremely specific dance?
L|Would you rather have a personal cloud for shade or a breeze that follows you indoors?
L|Which would be more fun: a holiday planned by a toddler or a dinner cooked by a robot comedian?
L|Would you rather all lifts have karaoke or all queues have comfortable sofas?
L|Pick a travelling companion: a sarcastic suitcase or a very enthusiastic map.
B|Would you rather revisit a perfect day or get a preview of an ordinary day ten years from now?
B|Would you rather learn a friend’s favourite skill or explore their favourite place with them?
B|Choose one for a year: more spontaneous invitations or more uninterrupted evenings.
B|Would you rather own less and travel slowly or build a wonderfully comfortable home base?
B|Would you rather be remembered for helping people laugh or helping them feel understood?
B|A free afternoon appears. Would you rather follow a plan or see where a walk takes you?
B|Would you rather recover a forgotten childhood memory or hear a friend’s untold story?
B|Would you rather have the courage to begin anything or the patience to finish anything?
D|Would you rather receive honest advice now or gentle encouragement while you figure it out?
D|Would you rather change one old decision or understand why you made it?
D|Would you rather become better at saying yes to opportunities or no to demands?
D|Would you rather leave a useful invention or a treasured tradition behind?`,
debates: `L|Is cereal a soup, or does breakfast need its own legal system?
L|Which animal would make the most dramatic restaurant critic?
L|Should the middle brownie or the corner brownie get the royal treatment?
L|What is the correct number of cushions before a sofa becomes an obstacle course?
L|Does a nap need a plan, or should it find you naturally?
L|Which is a greater luxury: perfect toast or a perfectly timed bus?
L|Defend one ridiculous item that belongs in an emergency picnic kit.
L|Should there be a separate queue for people who already know their order?
L|Which deserves a trophy: folding a fitted sheet or finding a matching container lid?
L|Is the best holiday photo the beautiful view or the terrible group selfie?
L|What snack could settle a disagreement between aliens and humans?
L|Should football goal celebrations have an optional synchronised dance category?
L|Which should be the unofficial sound of Friday evening?
L|Is arriving early for fun still fun, or is it suspiciously organised?
B|What everyday pleasure would you defend against an efficiency expert?
B|Should a recipe be followed faithfully or treated as a friendly suggestion?
B|Which deserves more celebration: a bold beginning or a steady habit?
B|Is getting lost together an inconvenience or the start of a better story?
D|Which harmless disagreement has taught you how differently people see the world?
D|When does being “good at doing nothing” become an underrated skill?`,
whatif: `L|You inherit a hotel for ghosts. What is its most popular amenity?
L|Every friend gets a tiny parade. What unusual float belongs in yours?
L|A town appoints you Minister of Small Annoyances. What do you fix first?
L|Your group opens a shop that sells only impossible things. What is the bestseller?
L|A vending machine dispenses excellent excuses. What would yours say?
L|Your favourite snack gains a voice. What advice does it insist on giving?
L|What would a World Cup for ordinary household tasks look like?
L|The MRT, or your local train, adds a surprise carriage. What happens inside?
B|You have one room with no practical purpose. What experience would you create?
B|You can send a postcard from an imaginary future. What scene is on the front?
B|A city gives every resident a free learning day each month. How would you spend yours?
B|Your friends get a weekend cabin with one unusual shared rule. What is it?
B|You can preserve one sound from your neighbourhood. Which do you choose?
B|An old hobby becomes your day job for a month. What delights or surprises you?
B|You get a ticket to watch one moment in history without changing it. What personal curiosity guides you?
B|Your life gets an extra season between summer and autumn. What is it for?
D|You can leave one question for your future self to answer. What would you ask?
D|A younger version of you visits for dinner. What would you hope they notice?
D|Your community tries a different definition of wealth. What might it count?
D|You have a year to nurture one thing that cannot be bought. What do you choose?`,
confessions: `L|What tiny inconvenience makes you disproportionately theatrical?
L|Which food combination do you enjoy that deserves a fair hearing?
L|What useless skill could you demonstrate with surprising confidence?
L|Name an object you talk to as though it can understand you.
L|Which everyday task do you secretly narrate in your head?
L|What is the most cheerful thing in your search history that you would happily share?
L|Which purchase was wonderfully silly and worth it?
L|What polite phrase do you use when your brain has temporarily left the room?
B|What interest of yours rarely comes up in conversation?
B|Which compliment surprised you because you had never noticed that quality in yourself?
B|What small routine do you enjoy more than people might guess?
B|When did you end up enjoying something you expected to dislike?
B|Which opinion about an everyday thing have you completely changed?
B|What is one thing you are a beginner at and enjoying anyway?
B|What cheerful detail would your friends include in a user manual for you?
B|Which kindness from a stranger caught you off guard?
D|What would you like people to understand about how you recharge?
D|Which part of growing older has been a pleasant surprise?
D|What are you learning to give yourself permission to enjoy?
D|What expectation have you quietly let go of, and what did that make room for?`,
deep: `L|Which tiny comfort would make a terrible motivational poster but an excellent day?
L|What would the title of your “learning to be an adult” sitcom be?
L|Give your current week a gentle, funny movie review.
L|What comically simple thing makes you feel like you have life figured out?
B|What does a friend do that makes spending time together feel easy?
B|Which conversation has stayed with you for a good reason?
B|When do you feel most like yourself?
B|What is one thing you hope your friendships make more room for?
B|Which ordinary moment recently reminded you that life can be good?
B|What helps you distinguish a passing worry from something worth acting on?
B|What have you learned from someone whose life looks different from yours?
B|Which kind of invitation would you love to receive more often?
D|What belief about a good life have you revised with experience?
D|How do you recognise when you have enough?
D|What has patience given you that rushing could not?
D|Which part of yourself do old friends help you remember?
D|What makes it easier for you to ask for support?
D|What does making peace with an unfinished chapter look like to you?
D|Which value is easiest to talk about but hardest to practise?
D|What would you like to be more deliberate about in the coming year?`,
memories: `L|Which fashion choice from your past deserves a friendly round of applause?
L|What was a playground rumour you once found hilariously convincing?
L|Which old ringtone, jingle or sound could still make you laugh?
L|Tell us about a journey where the wrong turn became the best part.
L|What is the funniest thing you packed for a trip and never needed?
L|Which childhood snack felt like a five-star treat?
L|What school-day invention made sense only to you and your friends?
L|Which forgotten game deserves a comeback at our next gathering?
B|Who first made a new place feel welcoming to you?
B|What is a memory you associate with a particular song?
B|Which everyday place from your childhood would you like to visit again?
B|What did your first pay packet or pocket money mean to you?
B|Describe a meal where the company mattered more than the food.
B|What shared memory do we each remember slightly differently?
B|Which neighbourhood ritual, in Singapore or elsewhere, do you miss when away?
B|When did a stranger turn a trip into a story you still tell?
D|Which past version of yourself deserves a little more credit?
D|What advice once sounded ordinary but made sense years later?
D|Which friendship tradition would you like to bring back?
D|What memory reminds you that you can adapt to change?`
},
work: {
ice: `all|What is one small thing that makes the start of your day better?
all|Which snack would you nominate as the unofficial meeting companion?
all|Name a place you would happily spend an extra hour.
all|What is something you enjoyed learning recently, at work or elsewhere?
all|Which sound would be a pleasant replacement for a meeting notification?
all|Describe your ideal break in three words.
all|What ordinary object on your desk has a story you can share?
all|What is a low-effort recommendation you would give for a nicer weekend?
all|Which season or kind of weather brings out your best mood?
all|What would you call a café designed around your ideal working break?
all|What is a small win from this week that you would like to celebrate?
all|Which non-work skill would you enjoy trying for an afternoon?
new|What is an easy conversation topic people can ask you about?
new|What helps you remember people’s names when joining a group?
established|What familiar team ritual makes the week a little brighter?
established|Which meeting opener have you unexpectedly enjoyed?
retreat|What would help you feel comfortably settled in this gathering?
retreat|Which little detail makes a shared space inviting?
leadership|What is one question that helps you listen better?
leadership|What everyday moment reminds you to slow down before responding?`,
laugh: `all|An office plant becomes our motivational speaker. What is its opening line?
all|Our printer gets a retirement party. What would the farewell card say?
all|What harmless task deserves its own dramatic movie trailer?
all|Design a meeting room for friendly aliens. What unusual feature does it need?
all|Your keyboard can add one delightfully unnecessary key. What does it do?
all|A penguin is our new receptionist. What is its excellent first impression?
all|What would a “reply all” button say if it could give gentle advice?
all|Which ordinary office item would make a surprisingly good cartoon hero?
all|Invent a ridiculous but comfortable commuting vehicle.
all|A calendar gets a day off. What does it choose to do?
all|What would be the funniest polite warning label on a mug?
all|Our team starts a band using desk objects. What is the debut album called?
new|Invent a friendly mascot for a team still getting to know one another.
new|What is a silly job title for a skill you use outside work?
established|Which harmless everyday team moment deserves a nature documentary voice-over?
established|What imaginary award would celebrate a tiny shared convenience?
retreat|Our retreat venue has a secret room of delightful nonsense. What is inside?
retreat|Everyone adds one absurd feature to a dream team picnic. What is yours?
leadership|You can issue one completely playful office decree for Friday. What is it?
leadership|What would a friendly robot misunderstand about the phrase “big picture”?`,
know: `all|What kind of problem do you find satisfying to untangle?
all|What helps you get comfortable when learning a new tool?
all|Which interest outside work gives you a fresh perspective?
all|What is a working preference you are happy for teammates to know?
all|How do you like to receive appreciation for a job well done?
all|What is something you enjoy making, fixing or organising?
all|When do you prefer a quick conversation over a written message?
all|Which activity leaves you feeling refreshed rather than simply distracted?
all|What makes an explanation easy for you to understand?
all|Which tiny preparation helps your day run more smoothly?
all|What would be an enjoyable topic for a five-minute talk you could give?
all|What is a strength you discovered through an unexpected activity?
new|What is helpful for others to know about how you like to ask questions?
new|What makes an introduction feel welcoming to you?
established|What is a skill we might not yet know you enjoy using?
established|Which part of your working style has changed since joining this team?
retreat|Which shared activity would let us discover something new about each other?
retreat|What experience outside your usual routine has broadened your perspective?
leadership|Which habit helps you stay curious when you already have experience?
leadership|What would you like to learn from someone earlier in their career?`,
connect: `all|What is a simple sign that a team is making room for everyone?
all|How can we make it easier to ask a question before confusion grows?
all|What kind of handover makes you feel supported?
all|Which small gesture helps an online meeting feel more human?
all|What does useful encouragement sound like during a tricky task?
all|How could we celebrate progress that is easy to overlook?
all|What makes shared decisions easier to understand?
all|What would make a newcomer feel welcome in their first week?
all|How can we show appreciation without putting someone on the spot?
all|What helps a quiet idea get a fair hearing?
all|Everyone share one small habit that makes collaboration easier for you.
all|What is a kind way to check whether someone has space for a new request?
new|Which simple team agreement would help us start well together?
new|How would you like to learn about the team’s unwritten routines?
established|Which useful team habit should we be careful to keep as we grow?
established|What is an optional ritual we could try to make connection easier?
retreat|What could we do today that helps conversation continue after the retreat?
retreat|What does a welcoming group discussion feel like from the participant’s seat?
leadership|How can leaders make it comfortable for someone to say “I need more clarity”?
leadership|What everyday action builds trust more effectively than a big speech?`,
grow: `all|What is a learning tip you wish you had discovered sooner?
all|Which kind of feedback helps you see a useful next step?
all|What tells you it is time for a short break?
all|How do you approach a task when you do not know where to begin?
all|What has being a beginner taught you about patience?
all|Which small habit has made a bigger difference than you expected?
all|What helps you separate a rough first draft from your opinion of your ability?
all|What is a question you use to understand a new situation?
all|When has simplifying something improved the result?
all|What helps you notice progress over a long stretch of learning?
all|Which skill would be enjoyable to practise without a deadline?
all|What makes it easier to say “I do not know yet”?
new|What is a comfortable way to ask for guidance while settling into a new team?
new|Which part of starting somewhere new can become a useful learning opportunity?
established|What have we learned about adapting our routines over time?
established|Which successful habit would benefit from being explained to new teammates?
retreat|What would you like to take time to practise or reflect on today?
retreat|What would make a learning session feel useful a month from now?
leadership|What helps you stay open to feedback when a decision is yours to make?
leadership|How do you model learning without needing to have every answer?`,
future: `all|What small improvement would make an ordinary workday more enjoyable?
all|Imagine a tool that removes one boring task. What would it free you to do?
all|What would a more welcoming workplace look or feel like?
all|Which skill do you think will stay useful even as tools change?
all|What would you put in a time capsule of good working habits?
all|What is one experiment you would enjoy trying if the stakes were small?
all|A future office includes a room devoted to curiosity. What happens there?
all|How could a team make learning from each other easier?
all|What should technology give people more time for?
all|What everyday process could become simpler with one thoughtful change?
all|What would you like your future working self to thank you for starting?
all|Imagine a neighbourhood workspace near an MRT or bus stop. What makes it welcoming?
new|What could help a new team become comfortable trying ideas together?
new|What is one good habit we could start before our routines become fixed?
established|Which team strength could open a new possibility for us?
established|What useful tradition could we carry into a different way of working?
retreat|What small idea from today would be worth exploring next week?
retreat|Design a future retreat with one thoughtful change. What would people enjoy?
leadership|What should we keep asking as our tools and plans evolve?
leadership|How could we make a promising experiment easy to begin and safe to learn from?`
}
};
const ages = {A:['all','kids','tweens','teens','adults'], K:['kids','tweens','teens','adults'], T:['tweens','teens','adults'], N:['teens','adults'], U:['adults']};
export const questions = Object.entries(bank).flatMap(([mode, categories]) => Object.entries(categories).flatMap(([category, lines]) => lines.split('\n').map((line, i) => {
  const [marker, text] = line.split('|');
  return {id:`${mode}-${category}-${String(i + 1).padStart(2,'0')}`, mode, category, text, ages: mode === 'family' ? ages[marker] : [], depth: mode === 'friends' ? {L:'laughs',B:'both',D:'deep'}[marker] : null, contexts: mode === 'work' ? [marker] : [], broad: mode === 'family' ? marker === 'A' && category !== 'faith' : mode === 'friends' ? marker === 'L' || marker === 'B' : marker === 'all' && ['ice','laugh','know','future'].includes(category)};
})));
export const questionById = new Map(questions.map(q => [q.id,q]));
export function categoryInfo(q) { return modes[q.mode].categories.find(c => c[0] === q.category); }
