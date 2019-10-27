import { css } from 'emotion';

const detailShare = css`
  border-top: 1px solid #3f3f3f;
  text-align: center;
  padding-top: 15px;
`;

const resp_sharing_button = css`
  display: inline-block;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  transition: background-color 25ms ease-out, border-color 25ms ease-out, opacity 250ms ease-out;
  margin: 0.5em;
  padding: 0.75em 0.9em;
  font-size:1.1em;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  user-select:none;

  a {
    text-decoration: none;
    color: #FFF;
    display: block;
  }
`;

const resp_sharing_button__icon = css`
  display: inline-block;
  stroke: #FFF;
  fill: none;

  svg {
    width: 1em;
    height: 1em;
    margin-bottom: -0.2em;
  }
`;

const resp_sharing_button__icon__solid = css`
  fill: #FFF;
  stroke: none;
`;

const resp_sharing_button__link = css`
  text-decoration: none;
  color: #FFF;
`;

const resp_sharing_button__facebook = css`
  background-color: #3b5998;
  border-color: #3b5998;

  &:hover {
    background-color: #2d4373;
    border-color: #2d4373;
  }

  &:active {
    background-color: #2d4373;
    border-color: #2d4373;
  }
`;

const resp_sharing_button__twitter = css`
  background-color: #55acee;
  border-color: #55acee;

  &:hover {
    background-color: #2795e9;
    border-color: #2795e9;
  }

  &:active {
    background-color: #2795e9;
    border-color: #2795e9;
  }
`;

const resp_sharing_button__google = css`
  background-color: #dd4b39;
  border-color: #dd4b39;

  &:hover {
    background-color: #c23321;
    border-color: #c23321;
  }

  &:active {
    background-color: #c23321;
    border-color: #c23321;
  }
`;

const resp_sharing_button__email = css`
  background-color: #444444;
  border-color: #444444;

  &:hover {
    background-color: #2B2B2B;
    border-color: #2B2B2B;
  }

  &:active {
    background-color: #2B2B2B;
    border-color: #2B2B2B;
  }
`;

const resp_sharing_button__reddit = css`
  background-color: #5f99cf;
  border-color: #5f99cf;

  &:hover {
    background-color: #3a80c1;
    border-color: #3a80c1;
  }

  &:active {
    background-color: #3a80c1;
    border-color: #3a80c1;
  }
`;

export default {
    detailShare,
    resp_sharing_button,
    resp_sharing_button__icon,
    resp_sharing_button__icon__solid,
    resp_sharing_button__link,
    resp_sharing_button__facebook,
    resp_sharing_button__twitter,
    resp_sharing_button__google,
    resp_sharing_button__email,
    resp_sharing_button__reddit
}