//Response로 보내줄 상태코드와 메세지 등을 이 파일에서 관리함

module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" },

    // Request error
    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2001, "message":"이메일을 입력해주세요" },
    ROOM_NAME_EMPTY : {"isSuccess": false, "code": 2002, "message": "방 이름을 입력해주세요."},
    USER_NAME_EMPTY : { "isSuccess": false, "code": 2007, "message":"닉네임을 입력해주세요"},
    ROOM_CODE_ERROR : { "isSuccess": false, "code": 2008, "message":"유효하지 않은 코드 번호입니다"},

    // Response error
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3001, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },
    NEW_ROOM_ERROR : {"isSuccess": false, "code": 3002, "message": "방 생성에 실패했습니다."},
    JOIN_ROOM_ERROR : {"isSuccess": false, "code": 3003, "message": "방 입장에 실패했습니다."}, 


    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
 
}
