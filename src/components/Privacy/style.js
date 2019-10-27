import { css } from 'emotion';

const detailContainer = css`
  padding: 15px;
  color: #3f3f3f;
  font-size: 1.1em;
  margin: 0 auto;
  max-width:600px;
  padding:30px;
`;

const infoBlock = css`
  padding: 15px;
  color: #3f3f3f;
  font-size: 1.1em;
  margin: 0 auto;
  text-align: center;
`;

const infoLink = css`
  color: #3f3f3f;
  text-decoration:none;
`;

const infoImportant = css`
  font-weight: bold;
`;

export default {
    detailContainer,
    infoBlock,
    infoLink,
    infoImportant
}