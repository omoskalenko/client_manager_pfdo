<template>
  <div class="sidebar" style="opacity: 1;">
    <div class="main-menu">
      <div class="scroll ps" style="height: 327px;">
        <ul class="list-unstyled">
          <li class="active">
            <a href="/create">
              <i class="fas fa-plus"></i> Создать сертификат
            </a>
          </li>
          <li>
            <a href="/search">
              <i class="fas fa-search"></i> Найти сертификат
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.sidebar {
  display: inline-block;
  position: fixed;
  top: 0;
  bottom: 0;
  padding-top: 120px;
  z-index: 5;
}
.sidebar .main-menu {
  width: 120px;
  height: 100%;
  background: white;
  z-index: 3;
  position: fixed;
  padding-top: 2px;
  left: 0;
}
.sidebar .main-menu.default-transition {
  transition: transform 300ms;
}
.sidebar .main-menu ul li {
  position: relative;
}
.sidebar .main-menu ul li span {
  text-align: center;
  padding: 0 10px;
  line-height: 14px;
}
.sidebar .main-menu ul li a {
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  border-bottom: 1px solid #f3f3f3;
  color: #212121;
  transition: color 300ms;
  transition: background 300ms;
}
.sidebar .main-menu ul li a:hover,
.sidebar .main-menu ul li a:focus {
  color: #145388;
  text-decoration: none;
  background: #f8f8f8;
}
.sidebar .main-menu ul li i {
  font-size: 32px;
  line-height: 42px;
}
.sidebar .main-menu ul li.active a {
  color: #145388;
}
.sidebar .main-menu ul li.active:after {
  content: " ";
  background: #145388;
  color: white;
  border-radius: 10px;
  position: absolute;
  width: 6px;
  height: 90px;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
}
</style>
