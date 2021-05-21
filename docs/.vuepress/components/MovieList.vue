<template>
	<div class="main">
		<div class="item-wrap" v-for="item in list">
			<div class="item">
				<div class="cover-wrap">
					<img :src="item.cover" :alt="item.name" class="cover" />
				</div>
				<div class="meta">
					<p class="name">{{ item.name }}</p>
					<!-- <p class="type">{{item}}</p> -->
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { list } from '../../movie/data.json'
export default {
	name: 'MovieList',
	data() {
		return {
			list,
		}
	},
	mounted() {},
}
</script>
<style scoped>
.main {
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
}

.item {
	height: 100%;
	transition: all 0.2s linear;
	cursor: pointer;
	background-color: var(--background-color);
	box-shadow: var(--box-shadow);
	border-radius: 0.25rem;
	overflow: hidden;
}

.item:hover {
	box-shadow: var(--box-shadow-hover);
	transform: translate3d(0, -2px, 0);
}
.item-wrap {
	width: 33.3%;
	padding: 6px;
	box-sizing: border-box;
}

.cover-wrap {
  width: 100%;
  padding-bottom: 145%;
  position: relative;
  overflow: hidden;
}

.item .cover {
	position: absolute;
  width: 100%;
  height: 100%;
	object-fit: cover;
	display: block;
}

.meta {
	padding: 10px;
	box-sizing: border-box;
}
.meta .name {
	line-height: 1.5;
	margin: 0;
}

@media screen and (max-width: 540px) {
	.item-wrap {
		width: 100%;
	}

	.item .cover {
		height: auto;
	}
}
</style>
