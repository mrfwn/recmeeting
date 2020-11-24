import styled from 'styled-components';
import { darken } from 'polished';
import ReactModal from 'react-modal';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #22b24c;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Menu = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    background: transparent;
    border: 0;
    outline: none;
    width: 70px;
    height: 50px;
    border-left: 2px solid #f4ede8;
    svg:hover{
      opacity: 0.8;
    }
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    width: 70px;
    height: 50px;
    & + a {
      border-left: 2px solid #f4ede8;
    }
    svg:hover{
      opacity: 0.8;
    }
  }
`;

export const ListCard = styled.ul`
  max-height: 60vh;
  width: calc(100% + 15px);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 24px;
  list-style: none;
  padding-right: 10px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
    border-radius: 4px;
    margin-top: 0px;
  }

  ::-webkit-scrollbar:hover {
    background: #e8e8e8;
  }

  ::-webkit-scrollbar-thumb {
    background: #22b24c;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${darken(0.1, '#22b24c')};
  }

  li {
    background: #fff;
    padding: 24px;
    border-radius: 15px;
    .headCard {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .bodyCard {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }

    .sectionOwner {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      align-content: flex-start;
    }

    .owner,
    .date {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: center;
    }

    .sectionButtons {
      display: flex;
      justify-content: space-between;
      svg {
        margin: 0 10px;
      }
    }

    svg {
      margin-right: 10px;
    }

    img {
      width: 80px;
      height: 80px;
    }

    button {
      background: #fff;
      right: 24px;
      height: 40px;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      margin: 0px 4px;
    }
    button:focus {
      outline: 0;
    }

    button:hover {
      opacity: 0.8;
      background: #22b24c;
      svg {
        background: #22b24c;
        fill: #ffffff;
      }
    }

    strong {
      color: #22b24c;
      font-size: 2em;
      max-width: 60%;
    }

    p {
      color: #737380;
      line-height: 21px;
      font-size: 16px;
    }
  }
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 10px auto;
  display: flex;
`;

export const Modal = styled(ReactModal)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  color: #ffffff;
  position: absolute !important;
  z-index: 4 !important;

  img {
    height: 80px;
  }

  textarea {
    width: 100%;
    height: 40vh;
    border: 0;
    border-radius: 8px;
    padding: 5px 10px;
    font-size: 1.3em;
    line-height: 1.3;
    position: relative;
    margin-left: 10px;

    ::-webkit-scrollbar {
      background: #e8e8e8;
      width: 10px;
      border-radius: 4px;
      margin-top: 0px;
    }

    ::-webkit-scrollbar-thumb {
      background: #22b24c;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: ${darken(0.1, '#22b24c')};
    }
  }
  .containerModal {
    background: #22b24c;
    border-radius: 8px;
    border: 0;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.3);

    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: space-around;
    margin-top: 5%;
    width: 70%;
    height: 60%;
  }

  .titleModal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 8px 8px 0px 0px;
    img {
      width: 20vh;
      height: 10vh;
    }
    strong {
      color: #22b24c;
      font-size: 1.5em;
    }
  }

  .bodyModel {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 95%;
  }

  .bodyBoxSelect {
    width: 70%;
    height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    border-right: 1px solid #ffffff;
    padding-right: 10px;

    @media (max-width: 400px) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }

  .BoxElement {
    width: 100%;
    display: flex;
    align-items: center;

    strong {
      width: 35%;
      font-size: 1.5em;
    }

    input,
    select,
    option {
      border-radius: 8px;
      width: 65%;
      border: 0;
      height: 50px;
      font-size: 1.1em;
      padding-left: 15px;
      margin: 5px 5px;
    }
  }

  .footerModel {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      border-radius: 8px;
      margin: 5px;
      width: 70px;
      height: 60px;
      border: 0;
      outline: none;
      background: #ffffff;
    }

    button:disabled {
      opacity: 1;
      cursor: no-drop;
    }

    button:hover {
      opacity: 0.9;
    }
  }
`;
