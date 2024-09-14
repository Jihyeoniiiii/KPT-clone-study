import { css } from 'styled-components';
import styled from 'styled-components';

const ButtonStyle = css`
  margin-top: 10px;
  background-color: #EEEEEE;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #fff79afa;
    border: none;
  }

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  ${ButtonStyle}
`;

function Button({ children, onClick }) {
    return (
        <SubmitButton onClick={onClick}>
            {children}
        </SubmitButton>
    );
}

export default Button;