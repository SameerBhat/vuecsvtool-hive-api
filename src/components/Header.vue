<template>
    <div class="header">
      <nav class="navbar navbar-light bg-light fixed-top">
        <div class="row top-menu">
          <div class="col offset-2">
            <a href="/vzsoi/verint/readme.html" target="_blank">Click Here</a> to find notes on promises
          </div>
          <div class="col offset-1">
            <a href="/vzsoi/verint/second.html" target="_blank">Click Here</a> to find notes on promises
          </div>
        </div>
        <a class="navbar-brand" href="/"> </a>
      </nav>
      
      <div class="header__bottom-section">
        <h1 class="text-dark mt-2">Agent's Notes Labeling Utility</h1>
      </div>
     
    </div>
  
</template>

<style lang="scss">
.header {
    height: 200px;
  & .navbar {
    padding: 0;

    & .top-menu {
      background: black;
      color: white;
      width: 100%;
      padding: 4px;

      & .col a:link {
        color: white;
      }
    }

    & .navbar-brand {
      background-image: url("data:image/svg+xml;charset=utf-8;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNjU4LjIgMTQ2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2NTguMiAxNDY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cG9seWdvbiBmaWxsPSIjRDUyQjFFIiBwb2ludHM9IjY0My43LDAgNjA3LjgsNzYuOCA1OTQuMyw0Ny43IDU3OS43LDQ3LjcgNjAxLjksOTUuMyA2MTMuNyw5NS4zIDY1OC4yLDAgCSIvPjxwYXRoIGQ9Ik00ODkuNywxNDIuNmgyOC45Vjg5LjdjMC0xMi4xLDctMjAuNiwxNy40LTIwLjZjMTAsMCwxNS4yLDcsMTUuMiwxNy4xdjU2LjRoMjguOVY4MC43YzAtMjEtMTIuNi0zNS44LTMzLTM1LjggYy0xMywwLTIyLjEsNS42LTI4LjksMTUuOGgtMC42di0xM2gtMjhMNDg5LjcsMTQyLjZMNDg5LjcsMTQyLjZ6IE00MzIuOSw0NS4xYy0zMC4yLDAtNTAuNCwyMS43LTUwLjQsNTAuMyBjMCwyOC40LDIwLjIsNTAuMyw1MC40LDUwLjNzNTAuNC0yMS45LDUwLjQtNTAuM0M0ODMuNCw2Ni44LDQ2My4xLDQ1LjEsNDMyLjksNDUuMXogTTQzMi43LDEyNC4zYy0xMy43LDAtMjEtMTEuNS0yMS0yOC45CWMwLTE3LjYsNy4yLTI4LjksMjEtMjguOWMxMy43LDAsMjEuMywxMS4zLDIxLjMsMjguOUM0NTQuMSwxMTIuOCw0NDYuNSwxMjQuMyw0MzIuNywxMjQuM3ogTTMwMC4xLDE0Mi42aDgxLjJ2LTIyLjhoLTQ2di0wLjYJbDQ0LTQ5LjNWNDcuNmgtNzkuMnYyMi45aDQ0LjV2MC42bC00NC41LDQ5LjdMMzAwLjEsMTQyLjZMMzAwLjEsMTQyLjZ6IE0yNjMsMTQyLjZoMjkuMVY0Ny43SDI2M1YxNDIuNnogTTE5NS41LDE0Mi42aDI5Vjk5CWMwLTE5LjgsMTEuOS0yOC42LDMwLTI2LjFoMC42di0yNWMtMS41LTAuNi0zLjItMC43LTUuOS0wLjdjLTExLjMsMC0xOC45LDUuMi0yNS40LDE2LjNoLTAuNlY0Ny43aC0yNy43VjE0Mi42eiBNMTQyLjMsMTI0LjQJYy0xMi44LDAtMjAuNi04LjMtMjIuMS0yMS4xaDY4LjRjMC4yLTIwLjQtNS4yLTM2LjctMTYuNS00Ni45Yy04LTcuNC0xOC41LTExLjUtMzEuOS0xMS41Yy0yOC42LDAtNDguNCwyMS43LTQ4LjQsNTAuMQljMCwyOC42LDE4LjksNTAuNCw1MC4zLDUwLjRjMTEuOSwwLDIxLjMtMy4yLDI5LjEtOC41YzguMy01LjcsMTQuMy0xNC4xLDE1LjktMjIuNGgtMjcuOEMxNTYuNiwxMjAuNywxNTAuOCwxMjQuNCwxNDIuMywxMjQuNHogTTE0MC44LDY1LjZjMTAuMiwwLDE3LjIsNy42LDE4LjQsMTguN2gtMzguOEMxMjIuNyw3My4xLDEyOC44LDY1LjYsMTQwLjgsNjUuNnogTTM0LDE0Mi42aDMwLjRsMzMtOTQuOUg2OC4zbC0xOC41LDYxaC0wLjQJbC0xOC41LTYxSDFMMzQsMTQyLjZ6IE0yNjMsMTMuOWgyOS4xdjI1LjhIMjYzVjEzLjl6Ii8+PC9nPjwvc3ZnPg==");
      height: 50px;
      width: 200px;
      display: block;
      background-repeat: no-repeat;
      margin: 10px 20px;
    }
  }

  &__bottom-section {
    top: 100px;
    position: absolute;
    background: url("https://ss7.vzw.com/is/image/VerizonWireless/exp-super-mini-banner-holiday-d?&scl=1")
      no-repeat center;
    background-size: cover;
    max-width: 100%;
    width: 100%;
    justify-content: center;
    display: flex;
    height: 84px;
    border-bottom: 1px solid #d8dada;
  }
 
}
</style>
