import styled from 'styled-components';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
  width: 100%;

  .line-1{
      position: relative;
      top: 50%;
      width: 24em;
      margin: 0 auto;
      border-right: 2px solid rgba(255,255,255,.75);
      font-size: 180%;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      transform: translateY(-50%);
  }

  .anim-typewriter{
    animation: typewriter 4s steps(44) 1s 1 normal both,
               blinkTextCursor 500ms steps(44) infinite normal;
  }
  @keyframes typewriter{
    from{width: 0;}
    to{width: 11em;}
  }
  @keyframes blinkTextCursor{
    from{border-right-color: rgba(255,255,255,.75);}
    to{border-right-color: transparent;}
  }
`;

