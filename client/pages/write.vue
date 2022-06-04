<template>
  <div>
    <img alt="mev logo image" :src="require('../static/mev.png')" />

    <div class="sidebar-page columns">
      <section class="sidebar-layout column">
        <b-sidebar open position="static">
          <div class="p-1">
            <div class="block">
              <b-menu class="is-custom-mobile">
                <b-menu-list>
                  <b-menu-item icon="account" label="My Account">
                    <b-menu-item
                      icon="account-box"
                      label="내가 쓴 글"
                    ></b-menu-item>
                    <b-menu-item
                      icon="account-box"
                      label="내가 쓴 댓글"
                    ></b-menu-item>
                  </b-menu-item>
                  <b-menu-item icon="menu" label="전체글 보기"></b-menu-item>
                  <b-menu-item icon="menu-down" label="장르별 보기">
                    <b-menu-item icon="" label="발라드"></b-menu-item>
                    <b-menu-item icon="" label="댄스/팝"></b-menu-item>
                    <b-menu-item icon="" label="아이돌"></b-menu-item>
                    <b-menu-item icon="" label="포크/어쿠스틱"></b-menu-item>
                    <b-menu-item icon="" label="랩/힙합"></b-menu-item>
                    <b-menu-item icon="" label="알앤비/소울"></b-menu-item>
                    <b-menu-item icon="" label="클래식"></b-menu-item>
                    <b-menu-item icon="" label="인디"></b-menu-item
                  ></b-menu-item>
                </b-menu-list>
              </b-menu>
            </div>
          </div>
        </b-sidebar>
      </section>
      <section class="column is-three-quarters">
        <div>
          <textarea></textarea>
          <div>
            <button id="write" @click="btn_write">글쓰기</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "IndexPage",
    data() {
      return {
        data: [
          {
            id: 1,
            title: "mamamoo",
            nickname: "Simmons",
            date: "2016-10-15 13:43:27",
            view: "Male",
          },
          {
            id: 2,
            title: "viviz",
            nickname: "Jacobs",
            date: "2016-12-15 06:00:53",
            view: "Male",
          },
          {
            id: 3,
            title: "IU",
            nickname: "Gilbert",
            date: "2016-04-26 06:26:28",
            view: "Female",
          },
          {
            id: 4,
            title: "ive",
            nickname: "Flores",
            date: "2016-04-10 10:28:46",
            view: "Male",
          },
          {
            id: 5,
            title: "taeyeon",
            nickname: "Lee",
            date: "2016-12-06 14:38:38",
            view: "Female",
          },
        ],
        columns: [
          {
            field: "id",
            label: "ID",
            width: "100",
            numeric: true,
            searchable: false,
          },
          {
            field: "title",
            width: "400",
            label: "제목",
            searchable: true,
          },
          {
            field: "nickname",
            label: "닉네임",
            searchable: true,
          },
          {
            field: "date",
            label: "작성일",
            searchable: true,
          },
          {
            field: "view",
            label: "조회수",
          },
        ],
      };
    },
  });
</script>
