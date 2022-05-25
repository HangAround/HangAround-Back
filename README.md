![hangaround-logo](https://user-images.githubusercontent.com/54930365/169801263-f7186f21-e45c-4947-bb56-7282d2b03884.png)
<br><br>
## <img src="https://user-images.githubusercontent.com/54930365/169820125-6d357736-4caa-4b7f-a7ed-3fff5a1c2fb5.png" width="40" height="25"/> HangAround 
COVID 19 등장 이후의 '언택트'의 시대를 위한 🧊**아이스 브레이킹 화상 웹 서비스**👨‍💻👩‍💻 (개발 기간: 22.03 - 22.05)  
💁‍♀️ 채팅방에서 자유로운 화상 회의가 가능합니다.  
💁‍♂️ 아이스 브레이킹을 위해 초성 게임을 진행할 수 있습니다.  
&nbsp;
## <img src="https://user-images.githubusercontent.com/54930365/169820125-6d357736-4caa-4b7f-a7ed-3fff5a1c2fb5.png" width="40" height="25"/> 기획  
### - 와이어프레임
<p align="center" style="border:gray"><kbd>
<img src="https://user-images.githubusercontent.com/54930365/169810776-050e2ed4-5040-428a-8b75-e5a25926ba8f.png" width="360" height="240"/>
<img src="https://user-images.githubusercontent.com/54930365/169810806-f56860b4-4ea7-45b4-aed6-be663fd35c0e.png" width="360" height="240"/></p><br>
<p align="center" style="border:gray"><kbd>
<img src="https://user-images.githubusercontent.com/54930365/169810826-54f0b071-63e6-4359-b47a-fbb9975a0c63.png" width="360" height="240"/>
<img src="https://user-images.githubusercontent.com/54930365/169810832-32bac7df-97be-46ab-9adc-b3243d096e47.png" width="360" height="240"/></p><br>
<p align="center" style="border:gray"><kbd>
<img src="https://user-images.githubusercontent.com/54930365/169812111-f58eca21-7c87-47cd-82cf-02a3b1e6c308.png" width="360" height="240"/>
<img src="https://user-images.githubusercontent.com/54930365/169812140-c3b3bbbf-b2b8-452b-a82b-d5ce6d1fc0f1.png" width="360" height="240"/></p><br>
&nbsp;  

### - 전체 모듈 설계도
<p align="center" >
<img src="https://user-images.githubusercontent.com/54930365/169818675-cb33d915-3cd0-41e7-9eda-a52ca5cab578.png" width="800" height="500"/></p>
&nbsp;  

## <img src="https://user-images.githubusercontent.com/54930365/169820125-6d357736-4caa-4b7f-a7ed-3fff5a1c2fb5.png" width="40" height="25"/> 시연 영상
&nbsp;

## <img src="https://user-images.githubusercontent.com/54930365/169820125-6d357736-4caa-4b7f-a7ed-3fff5a1c2fb5.png" width="40" height="25"/> 주요 기술

### 1. WebRTC [🔗](https://webrtc.org/)
![2](https://user-images.githubusercontent.com/100418646/170182103-f7f62f22-e035-43af-b8e5-5a0add9b6668.png)
> WebRTC(Web Real-Time Communications)란, 웹 애플리케이션 및 사이트들이 별도의 소프트웨어 없이 음성, 영상 미디어 혹은 텍스트, 파일 같은 데이터를 P2P 방식으로 브라우져끼리 주고 받을 수 있게 만든 JavaScript 기반 오픈소스입니다. 💻
> 
> WebRTC는 Latency가 짧다는 장점이 있습니다. 때문에 지연시간이 거의 없는 REAL-TIME 방송이 가능해집니다. 별다른 미디어 송출 관련 소프트웨어의 설치 없이 실시간 커뮤니티가 가능하다는 것도 장점입니다. 😄
> 
> 하지만 사람들이 잘 사용하지 않는 브라우저나 최신버전을 사용하지 않는 사용자는 사용이 불가능하다는 단점이 있습니다. 또한 P2P 통신을 하기 위해서는 사용자의 IP주소를 알아야 하는데, 이를 위해 STUN/TURN 서버가 필요하다는 것 역시 단점이 될 수 있습니다. 🤔

### 2. Web Socket
![img](https://user-images.githubusercontent.com/100418646/170182305-4f0df2c5-151a-480d-bed5-e2f7ee4d0469.jpg)
> WebSocket은 하나의 TCP 접속에 전이중 통신 채널을 제공하는 컴퓨터 통신 프로토콜입니다. 쉽게 이야기하면 웹 버전의 TCP또는 Socket이라고 이해할 수 있습니다. 이를 통해 서버와 클라이언트 간에 Socket Connection을 유지해서 언제든 양방향 통신 또는 데이터 전송이 가능해지도록 하는 기술로, 본 프로젝트에서는 화상채팅 구현을 위하여 사용되었습니다. 📹
> 
> 실시간 통신이 가능하다는 장점 외에도 클라이언트와 한 번 연결이 되면 계속 같은 라인을 사용해서 통신하므로 HTTP와 TCP연결 트래픽을 피할 수 있다는 장점이 있습니다. 🔥 

### 3. STT
<img src="[https://user-images.githubusercontent.com/54930365/169820125-6d357736-4caa-4b7f-a7ed-3fff5a1c2fb5.png](https://www.w3.org/2005/Incubator/htmlspeech/XGR-htmlspeech-20111206/HighLevelSolutionDiagram_V2.jpg)" width="612" height="456"/>
> STT(Speech-to-Text)란 사람이 말하는 음성 언어를 컴퓨터가 해석하여 그 내용을 문자 데이터로 전환하는 처리를 말합니다. 입력 음성을 전처리한 후, 많은 음성 데이터에 의해 트레이닝된 모델과 비교하여 텍스트 결과를 출력하게 됩니다. 따라서, 얼마나 다양한 음성 데이터로 트레이닝을 했는지, 얼마나 특화된 알고리즘을 통하여 모델을 생성했는지 등 다양한 기술에 따라 결과물이 다르게 출력됩니다.🎙️
> 
> 대표적인 STT API 서비스로는 Google Cloud Speech API, Kakao Speech API, Naver CSR, Microsoft Azure STT 등이 있습니다. 본 프로젝트에서는 Web Speech API를 활용하였습니다. 브라우저에서 사용 가능한 STT API로 오픈소스이고, MDN 문서가 작성되어 있어 사용에 용이하다는 장점이 있습니다. 😍
&nbsp;

## <img src="https://user-images.githubusercontent.com/54930365/169820125-6d357736-4caa-4b7f-a7ed-3fff5a1c2fb5.png" width="40" height="25"/> 기술 스택
### - 백엔드  
   <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/> <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=Amazon%20AWS&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
* nodejs: v16.6.1 
* express: v4.17.3
* MySQL  
* Docker
* AWS CLI: v2 
* AWS EC2
&nbsp;

### - 프론트엔드  
   <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=black"/>

&nbsp;
#### Install modules dependency
$ npm install

#### Run Project

$ yarn start
$ npm start

#### Build project

$ yarn build

&nbsp;
## <img src="https://user-images.githubusercontent.com/54930365/169820125-6d357736-4caa-4b7f-a7ed-3fff5a1c2fb5.png" width="40" height="25"/> 팀원 소개
|이름|github|역할|소감 | 
|:--------:|:--------:|:--------:|:------:|
| 김승지  |🔗[링크](https://github.com/seungjikim)|프론트엔드   |테스트3|
| 김예지 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  |🔗[링크](https://github.com/2214yj) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|팀장</br>백엔드</br>디자인 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   | Node.js를 활용한 백엔드 개발과 실시간 웹소켓 통신 다루기, STT API 사용하기, 서버 배포, 웹 디자인 등 새롭고 다양한 경험을 할 수 있었던 프로젝트입니다. 어렵게 느껴지는 부분도 있었지만 그만큼 더 성장할 수 있었습니다. 팀원들과 함께 수많은 에러와 역경을 이겨내고 호흡을 맞추면서 팀워크가 어떤 건지 느꼈습니다. :seedling: |
| 노진주 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  |🔗[링크](https://github.com/Rhojinjoo) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|백엔드 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   | 이번 프로젝트로 Postman, DataGrip, Figma 등 새로 접하는 툴들의 사용에 익숙해질 수 있었습니다. 팀원들과 코드를 리뷰하며 Node.js의 라우팅 구조와 데이터베이스 관리에 관해 공부할 수 있었고, 프로젝트를 자세히 기획하고 역할을 분담하는 과정을 통해 협업하는 방법을 배울 수 있었습니다. 좋은 팀원들과 함께해 더욱 많이 배울 수 있었던 뜻깊은 시간이었습니다. 🌟 |
| 이수민  |🔗[링크](https://github.com/leesyum)|백엔드      |Node.js + TypeScript + Express라는 새로운 프레임워크에 도전하면서 어렵게 느껴지는 부분들이 많았지만, 덕분에 더욱 성장할 수 있었던 것 같습니다. 백엔드 개발 이외에도 와이어프레임 제작과 WebRTC, STT API, AWS 연동 등 다양한 경험을 해볼 수 있었기에 의미가 큰 프로젝트였습니다. 아이디어를 디벨롭하고, 구현을 진행하는 과정에서 어려운 점들도 많았지만 팀원들과 함께 하나하나 해결해 나갔기에 더욱 값진 경험이었습니다. ✨ |
