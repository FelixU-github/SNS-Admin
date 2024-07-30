<!-- <template>
  <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 50 }">
    <template #icon>

      <GithubOutlined />
    </template>
  </a-avatar>
</template>
<script lang="ts" setup>
import { AntDesignOutlined,GithubOutlined } from '@ant-design/icons-vue';
</script>
 -->

 <template>
  <a-avatar 
    :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 50 }" 
    :src="avatarSrc">
  </a-avatar>
</template>

<script lang="ts" setup>
import avatarImage from './TestPicture2.jpg';

const avatarSrc = avatarImage;
</script>
<style scoped>
.avatar-with-border {
  border: 2px solid #3498db; /* 边框颜色 */
  border-radius: 50%; /* 圆形边框 */
  box-sizing: border-box; /* 包含边框大小 */
}
</style>