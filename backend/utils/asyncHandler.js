// 컨트롤러/미들웨어의 try/catch 보일러플레이트를 한곳에 모으는 고차 함수.
// 핸들러를 감싸 비동기 예외를 잡아 일관된 500 응답으로 변환한다.
const asyncHandler = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    console.error(`Error in ${handler.name || 'handler'}:`, error.message);
    res.status(500).json({ result: false, message: 'Internal server error' });
  }
};

export default asyncHandler;
