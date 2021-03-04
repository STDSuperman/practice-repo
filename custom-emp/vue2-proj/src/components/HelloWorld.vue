<template>
	<div class="hello">
		<Card hoverable style="width: 240px">
			<img
				slot="cover"
				alt="example"
				src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
			/>
			<CardMeta title="Vue HelloWorld">
				<template slot="description">
					我是Vue组件！！！
				</template>
			</CardMeta>
		</Card>
	</div>
</template>

<script>
import { Card } from 'ant-design-vue'
export default {
	name: "HelloWorld",
	props: {
		msg: String,
	},
  components: {
    Card,
    CardMeta: Card.Meta
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 240px;
  height: 400px;
  display: inline-block;
  margin: 10px;
}
</style>
