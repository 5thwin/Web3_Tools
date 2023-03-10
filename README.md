# Web3 Tools
### 플랫팜 미니 프로젝트

**서비스 도메인**
https://main--rainbow-buttercream-46c6b6.netlify.app/

# 사용 방법
1. 크롬 확장프로그램 MetaMask 설치 https://metamask.io/download/
2. 지갑 생성 혹은 계정 가져오기를 통해 계정 등록.

# 주요 기능
## 1. 보유한 Clone X nft 토큰 이미지 출력
<img width="60%" alt="스크린샷 2023-03-07 오전 11 03 59" src="https://user-images.githubusercontent.com/52368089/223300727-d205586b-5b15-4f54-8ef4-e4221ce1f69a.png">

해당 EOA(외부소유계정)가 CloneX NFT를 가지고 있을 경우 해당 NFT의 이미지를 리스트 하여 보여줌
### 해당 EOA가 NFT를 가지고 있지 않은 경우, 
1. 검색창에 NFT를 소유하고 있는 account의 address를 입력하여 이미지 출력 가능
2. Sample 유저 (User1~3) 버튼을 클릭하여, 임의로 해당 계정이 보유하고 있는 이미지 출력 가능

## 2. Sepolia Testnet NFT 기능 (구현 중)
### 보유 잔고 확인
해당 EOA가 보유 중인 잔고 출력

* 해당 기능은 Sepolia Testnet에서만 작동합니다.
### 승인된 Transaction 출력 및 Pending 상태인 Transaction 취소 (진행 중)
- hardhat으로 Sepolia Testnet에 NFT 배포 후 구현 예정.

# 실행 방법
```
git clone git@github.com:5thwin/Web3_Tools.git
cd Web3_Tools
yarn install
yarn start
```
