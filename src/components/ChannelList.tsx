import styled from "styled-components"

export const ChannelList = () => {
  return (
    <Container>
      <details open>
        <summary>Channels</summary>
      </details>
    </Container>
  )
}

const Container = styled.div`
  white-space: nowrap;

  padding-top: 10px;
  padding-bottom: 10px;
  summary {
    padding-left: 1rem;
  }
  ul {
    display: flex;
    flex-direction: column;

    padding: 0;
    margin: 0;
    list-style: none;
    li {
      padding-left: 1rem;
      height: 28px;
      display: flex;
      align-items: center;
    }
  }
`
