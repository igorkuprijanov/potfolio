//page loading animation

let textAnimation = setInterval(loadingAnimation, 500)


window.addEventListener('load', ()=>{
    if(window.innerWidth < 768){
        alert('This website is ment to be viewed on a dekstop, not mobile. Some functions might not work on mobile devices.')
    }
    document.getElementById('loaderContainer').style.opacity = '0'
    setTimeout(()=>{
        clearInterval(textAnimation)
        document.getElementById('loaderContainer').remove()
    }, 500)
})


function loadingAnimation(){
    if(document.getElementById('loadingText').innerHTML.split('.').length<4){
        document.getElementById('loadingText').innerHTML += '.'
    }else{
        document.getElementById('loadingText').innerHTML = ''
    }
}

//navigation

class Section{
    constructor(element, position, nav){
        this.element = element
        this.position = position
        this.nav = nav
    }
}

let sections = []

for(let i = 0; i<document.querySelectorAll('section').length; i++){
    
    let navigationButton = document.createElement('img')
    navigationButton.setAttribute('src', './assets/circle.svg')
    navigationButton.setAttribute('class', 'navigationCircle')
    document.getElementById('navigatorContainer').appendChild(navigationButton)
    
    navigationButton.addEventListener('click', buttonNavigation)
    navigationButton.addEventListener('mouseenter', hoverOnNavigation)
    navigationButton.addEventListener('mouseleave', hoverOffNavigation)
    
    
    sections.push(new Section(document.querySelectorAll('section')[i], i, document.querySelectorAll('.navigationCircle')[i]))
}

let currentsection = sections[0]
currentsection.element.style.display = 'inherit'
document.querySelectorAll('.navigationCircle')[0].setAttribute('src', './assets/circleFull.svg')

//navigation button behaviour
function buttonNavigation(){
    this.removeEventListener('click', buttonNavigation)
    let target = whatSectionIsThis(this)
    clearAllButtons()
    colorButton(this)
    scrolling(target)
    setTimeout(()=>{
        this.addEventListener('click', buttonNavigation)
    }, 1000)
}

function hoverOnNavigation(){
    let disclamerContainer = document.createElement('div')
    let disclamerBackground = document.createElement('img')
    let disclamerText = document.createElement('p')
    
    disclamerContainer.setAttribute('id', 'navigationDescriptionContainer')
    disclamerBackground.setAttribute('src', './assets/notification.svg')
    
    disclamerText.innerHTML = whatSectionIsThis(this).element.getAttribute('name')
    
    document.getElementById('navigationContainer').appendChild(disclamerContainer)
    disclamerContainer.appendChild(disclamerBackground)
    disclamerContainer.appendChild(disclamerText)
    
    document.getElementById('navigationDescriptionContainer').style.left = (this.offsetLeft + (window.innerWidth/100*3)) +'px'
    document.getElementById('navigationDescriptionContainer').style.top = (this.offsetTop + (window.innerHeight/100*3)) +'px'
}

function hoverOffNavigation(){
    document.getElementById('navigationDescriptionContainer').remove()
}


//link behaviour

function linkClickEvent(event){
    event.target.onclick = ''
    switch(event.target.innerHTML){
        case "About":
            for(let i =0; i<sections.length; i++){
                if(sections[i].element == document.getElementsByName('About')[0]){
                    let target = sections[i]
                    scrolling(target)
                    clearAllButtons()
                    colorButton(sections[i].nav)
                    linkHoverOffEvent()
                }
            }
            setTimeout(()=>{
                event.target.onclick = linkClickEvent
            }, 1000)
            
        break;
        case "Projects":
            for(let i =0; i<sections.length; i++){
                if(sections[i].element == document.getElementsByName('Project 1')[0]){
                    let target = sections[i]
                    scrolling(target)
                    clearAllButtons()
                    colorButton(sections[i].nav)
                    linkHoverOffEvent()
                }
            }
            setTimeout(()=>{
                event.target.onclick = linkClickEvent
            }, 1000)
        break;
        case "Contacts":
            for(let i =0; i<sections.length; i++){
                if(sections[i].element == document.getElementsByName('Contacts')[0]){
                    let target = sections[i]
                    scrolling(target)
                    clearAllButtons()
                    colorButton(sections[i].nav)
                    linkHoverOffEvent()
                }
            }
            setTimeout(()=>{
                event.target.onclick = linkClickEvent
            }, 1000)
        break;
    }
    
}

function linkHoverEvent(){
    switch(event.target.innerHTML){
        case "About":
            document.querySelectorAll('.navigationCircle')[1].style.boxShadow = '0px 2px 10px 0px rgba(54,186,59,0.75)'
            break;
        case "Projects":
            document.querySelectorAll('.navigationCircle')[2].style.boxShadow = '0px 2px 10px 0px rgba(54,186,59,0.75)'
            break;
        case "Contacts":
            document.querySelectorAll('.navigationCircle')[document.querySelectorAll('.navigationCircle').length-1].style.boxShadow = '0px 2px 10px 0px rgba(54,186,59,0.75)'
            break;
    }
}

function linkHoverOffEvent(){
    for(let i=0; i<document.querySelectorAll('.navigationCircle').length; i++){
        document.querySelectorAll('.navigationCircle')[i].style.boxShadow = ''
    }
}

//mouse wheel behaviour
document.addEventListener('wheel', mouseScroll, { capture: false, passive: false } )

function mouseScroll(event){
    event.preventDefault()
    if(event.deltaY<0){
        if(currentsection.position > 0){
            document.removeEventListener('wheel', mouseScroll, { capture: false, passive: false } )
            scrolling(sections[currentsection.position - 1])
            clearAllButtons()
            colorButton(document.querySelectorAll('.navigationCircle')[currentsection.position - 1])
        }
    }else{
        if(currentsection.position != sections.length -1){
            document.removeEventListener('wheel', mouseScroll, { capture: false, passive: false } )
            scrolling(sections[currentsection.position + 1])
            clearAllButtons()
            colorButton(document.querySelectorAll('.navigationCircle')[currentsection.position + 1])
        }
    }
}

//current section navigation button is colored

function colorButton(button){
    button.setAttribute('src', './assets/circleFull.svg')
}

function clearAllButtons(){
    let allNavButtons = document.querySelectorAll('.navigationCircle')
    for(let i =0; i<allNavButtons.length; i++){
        allNavButtons[i].setAttribute('src', './assets/circle.svg')
    }
}


function scrolling(target){
    if(target.element != currentsection.element){
    
    target.element.style.display = 'inherit'
    
    let oldPosition = randomDirection()
    target.element.style.left = oldPosition.x + 'px'
    target.element.style.top = oldPosition.y + 'px'
    target.element.style.zIndex = 1
    currentsection.element.style.zIndex = 0

    setTimeout(()=>{target.element.setAttribute('class','inview')}, 100)
    
    
    setTimeout(()=>{
        if(currentsection.element.classList[0] == 'inview'){
            currentsection.element.classList.remove('inview')
        }
        currentsection.element.style.display = 'none'
        currentsection = target
        document.addEventListener('wheel', mouseScroll, { capture: false, passive: false })
    }, 600)
        
        
    }
}


function whatSectionIsThis(element){
        for(let i=0; i<sections.length; i++){
            if(sections[i].nav == element){
                return(sections[i])
    }}}

function randomDirection(){
    let dice = Math.floor(Math.random()*4)
    switch(dice){
        case 0:
        return {x: 0, y: -screen.height}
        break;
            
        case 1:
        return {x: 0, y: screen.height}
        break;
            
        case 2:
        return {x: -screen.width, y: 0}
        break;
            
        case 3:
        return {x: screen.width, y: 0}
        break;
    }
}


//emialjs form
window.onload = () =>{
    emailjs.init(config.key);
    document.getElementById('form').addEventListener('submit', function(event){
             event.preventDefault()
                this.contact_number.value = Math.random() * 100000 | 0;
                emailjs.sendForm('mymain', 'contact_form', this)
                .then(function(){
                    console.log('success!!!')
                    alert('Your message has been sent, I will anwser you as soon as possible')
                    document.getElementById('nameInput').value = ''
                    document.getElementById('companyInput').value = ''
                    document.getElementById('emailInput').value = ''
                    document.getElementById('messageInput').value = ''
                },function(error){
                    alert('error: ', error)
                })      
     })
}


//tech icon interaction
document.querySelectorAll('.techIcon').forEach((item)=>{
    item.addEventListener('click', ()=>{
        let target = whatIsIt(event.target.name)
        window.open(target.link, '_blank')
    })
    
    item.addEventListener('mouseenter', ()=>{
        let container = document.createElement('div')
        
        container.setAttribute('class', 'techIconDescriptionContainer')
        if(event.target.parentElement.parentElement.id === 'languagesAndFrameworks'){
           container.style.top = (event.target.offsetTop - (parseInt(window.innerHeight)*0.45))+ 'px'
        }else if(event.target.parentElement.parentElement.id === 'mostUsedLibraries'){
            container.style.top =(event.target.offsetTop - (parseInt(window.innerHeight)*0.45))+ 'px'
        }else{
            container.style.top = (event.target.offsetTop - (parseInt(window.innerHeight)*0.45))+ 'px'
        }
        
        container.style.left = event.target.offsetLeft - (parseInt(window.innerWidth)*0.1)+ 'px'
        document.getElementById('aboutSection').appendChild(container)
        
        
        let target = whatIsIt(event.target.name)
        
        let title = document.createElement('h1')
        let text = document.createElement('p')
        let image = document.createElement('img')
        title.innerHTML = target.name
        text.innerHTML = target.text
        image.setAttribute('src', target.image)
        
        container.appendChild(title)
        container.appendChild(text)
        container.appendChild(image)
        
    })
    
    
    item.addEventListener('mouseout', ()=>{
        document.querySelector('.techIconDescriptionContainer').remove()
    })
})

//project expand/close buttons
function setEventListeners(){
    for(let i =0; i<document.querySelectorAll('.projectExpandButton').length; i++){
        document.querySelectorAll('.projectExpandButton')[i].addEventListener('click', (event)=>{
        expandProject(event.target.parentElement.parentElement)
    })
        document.querySelectorAll('.showLessProjectButton')[i].addEventListener('click', (event)=>{
        shrinkProject(event.target.parentElement.parentElement)
    })
    }
}
setEventListeners()

//projects animations

function expandProject(project){
    project.querySelector('.sidePanel').style.marginTop = '-' + window.innerHeight + 'px'
    project.querySelector('video').style.filter = 'contrast(0.6) brightness(0.7)'
    project.querySelector('.projectExpanded').style.opacity = 1;
    project.querySelector('.projectExpanded').querySelectorAll('.projectDescriptionContainer')[0].style.marginLeft ='0px'
    project.querySelector('.projectExpanded').querySelectorAll('.projectDescriptionContainer')[1].style.marginRight ='0px'
    project.querySelector('.projectExpanded').querySelectorAll('.projectDescriptionContainer')[2].style.marginLeft ='0px'
}

function shrinkProject(project){
    project.querySelector('.sidePanel').style.marginTop = '0px'
    project.querySelector('video').style.filter = 'contrast(1) brightness(1)'
    project.querySelector('.projectExpanded').style.opacity = 0;
    project.querySelector('.projectExpanded').querySelectorAll('.projectDescriptionContainer')[0].style.marginLeft ='-1000px'
    project.querySelector('.projectExpanded').querySelectorAll('.projectDescriptionContainer')[1].style.marginRight ='-1000px'
    project.querySelector('.projectExpanded').querySelectorAll('.projectDescriptionContainer')[2].style.marginLeft ='-1000px'
}

//detect hover image
function whatIsIt(target){
    switch(target){
        case 'html':
            return {
                name: 'HTML',
                text: 'HTML is the standard markup language for creating Web pages.',
                image: './assets/websitepreviews/html.webp',
                link: 'https://html.spec.whatwg.org/'
            }
            break;
        case 'javascript':
            return {
                name: 'JavaScript',
                text: 'JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification.',
                image: './assets/websitepreviews/javascript.webp',
                link: 'https://www.javascript.com/'
            }
            break;
        case 'css':
            return {
                name: 'CSS',
                text: 'CSS is a style sheet language used for describing the presentation of a document written in a markup language such as HTML.',
                image: './assets/websitepreviews/css.webp',
                link: 'https://www.w3.org/TR/CSS/#css'
            }
            break;
        case 'nodejs':
            return {
                name: 'Node.js',
                text: 'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine.',
                image: './assets/websitepreviews/nodejs.webp',
                link: 'https://nodejs.org/en/'
            }
            break;
        case 'express':
            return {
                name: 'Express.js',
                text: 'Express.js, or simply Express, is a back end web application framework for Node.js.',
                image: './assets/websitepreviews/express.webp',
                link: 'https://expressjs.com/'
            }
            break;
        case 'react':
            return {
                name: 'React',
                text: 'React is an open-source front-end JavaScript library for building user interfaces or UI components.',
                image: './assets/websitepreviews/react.webp',
                link: 'https://reactjs.org/'
            }
            break;
        case 'sass':
            return {
                name: 'Sass',
                text: 'Sass is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets.',
                image: './assets/websitepreviews/sass.webp',
                link: 'https://sass-lang.com/'
            }
            break;
        case 'threejs':
            return {
                name: 'Three.js',
                text: 'Three.js is a cross-browser JavaScript library and application programming interface used to create and display animated 3D computer graphics.',
                image: './assets/websitepreviews/threejs.webp',
                link: 'https://threejs.org/'
            }
            break;
        case 'bootstrap':
            return {
                name: 'Bootstrap',
                text: 'Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development.',
                image: './assets/websitepreviews/bootstrap.webp',
                link: 'https://getbootstrap.com/'
            }
            break;
        case 'animejs':
            return {
                name: 'Anime.js',
                text: 'Anime.js is a lightweight JavaScript animation library with a simple, yet powerful API.',
                image: './assets/websitepreviews/animejs.webp',
                link: 'https://animejs.com/'
            }
            break;
        case 'webrtc':
            return {
                name: 'WebRTC',
                text: 'WebRTC is a free, open-source project providing web browsers and mobile applications with real-time communication.',
                image: './assets/websitepreviews/webrtc.webp',
                link: 'https://webrtc.org/'
            }
            break;
        case 'animatecss':
            return {
                name: 'Animate.css',
                text: 'Animate.css is a library of ready-to-use, cross-browser animations.',
                image: './assets/websitepreviews/animatecss.webp',
                link: 'https://animate.style/'
            }
            break;
        case 'redux':
            return {
                name: 'Redux',
                text: 'Redux is an open-source JavaScript library for managing application state.',
                image: './assets/websitepreviews/redux.webp',
                link: 'https://redux.js.org/'
            }
            break;
        case 'socketio':
            return {
                name: 'Scoket.IO',
                text: 'Socket.IO is a JavaScript library for realtime web applications.',
                image: './assets/websitepreviews/socketio.webp',
                link: 'https://socket.io/'
            }
            break;
        case 'figma':
            return {
                name: 'Figma',
                text: 'Figma is a vector graphics editor and prototyping tool which is primarily web-based, with additional offline features.',
                image: './assets/websitepreviews/figma.webp',
                link: 'https://www.figma.com/'
            }
            break;
        case 'git':
            return {
                name: 'Git',
                text: 'Git is software for tracking changes in any set of files, usually used for coordinating work among programmers.',
                image: './assets/websitepreviews/git.webp',
                link: 'https://git-scm.com/'
            }
            break;
        case 'npm':
            return {
                name: 'NPM',
                text: 'npm is a package manager for the JavaScript programming language.',
                image: './assets/websitepreviews/npm.webp',
                link: 'https://www.npmjs.com/'
            }
            break;
        case 'atom':
            return {
                name: 'Atom',
                text: 'Atom is a free and open-source text and source code editor for macOS, Linux, and Microsoft Windows.',
                image: './assets/websitepreviews/atom.webp',
                link: 'https://atom.io/'
            }
            break;
        case 'windows':
            return {
                name: 'Windows',
                text: 'Microsoft Windows, commonly referred to as Windows, is a group of several proprietary graphical operating system families.',
                image: './assets/websitepreviews/windows.webp',
                link: 'https://www.microsoft.com/en-us/windows'
            }
            break;
        case 'mongodb':
            return {
                name: 'MongoDB',
                text: 'MongoDB is a source-available cross-platform document-oriented database program.',
                image: './assets/websitepreviews/mongodb.webp',
                link: 'https://www.mongodb.com/'
            }
            break;
        case 'blender':
            return {
                name: 'Blender',
                text: 'Blender is a free and open-source 3D computer graphics software.',
                image: './assets/websitepreviews/blender.webp',
                link: 'https://www.blender.org/'
            }
            break;
           }
}


