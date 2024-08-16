<template>
  <div class="cardWrap">
    <div class="card cardLeft">
      <h1>Startup <span>Cinema</span></h1>
      <div class="title">
        <h2>How I met your Mother</h2>
        <span>movie</span>
      </div>
      <div class="seat">
        <h2>156</h2>
        <span>seat</span>
      </div>
      <div class="time">
        <h2>12:00</h2>
        <span>time</span>
      </div>
    </div>

    <div class="card cardRight">
      <div class="eye"></div>
      <div class="number">
        <h3>156</h3>
        <span>seat</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$red: #ef4444;
$grey: #ecedef;
$black: #343434;

.cardWrap {
  color: #fff;
}

.card {
  background: linear-gradient(to bottom, $red 0%, $red 26%, $grey 26%, $grey 100%);
  height: 12em;
  float: left;
  position: relative;
  padding: 1em;
}

.cardLeft {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  width: 16em;
}

.cardRight {
  width: 6.5em;
  border-left: 0.18em dashed #fff;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 0.9em;
    height: 0.9em;
    background: #fff;
    border-radius: 50%;
    left: -0.5em;
  }
  &:before {
    top: -0.4em;
  }
  &:after {
    bottom: -0.4em;
  }
}

h1 {
  font-size: 1.1em;
  margin-top: 0;
  span {
    font-weight: normal;
  }
}

.title,
.seat,
.time {
  text-transform: uppercase;
  font-weight: normal;
  h2 {
    font-size: 0.9em;
    color: #525252;
    margin: 0;
  }
  span {
    font-size: 0.7em;
    color: #a2aeae;
  }
}

.title {
  margin: 1.7em 0 0 0;
}

.seat {
  margin: 0.7em 0 0 0;
}

.time {
  margin: 0.7em 0 0 1em;
}

.seat,
.time {
  float: left;
}

.eye {
  position: relative;
  width: 2em;
  height: 1.5em;
  background: #fff;
  margin: 0 auto;
  border-radius: 1em/0.6em;
  z-index: 1;
  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    border-radius: 50%;
  }
  &:before {
    width: 1em;
    height: 1em;
    background: $red;
    z-index: 2;
    left: 8px;
    top: 4px;
  }
  &:after {
    width: 0.5em;
    height: 0.5em;
    background: #fff;
    z-index: 3;
    left: 12px;
    top: 8px;
  }
}

.number {
  text-align: center;
  text-transform: uppercase;
  h3 {
    color: $red;
    margin: 0.7em 0 0 0;
    font-size: 2.5em;
  }
  span {
    display: block;
    color: #a2aeae;
  }
}
</style>
