<script setup>
import { onMounted, reactive } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { Location } from "@element-plus/icons-vue";

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "5e0ef2cf9deda644d8baf82d8a6025da"
  };

  getLocalWeather();
});

function getLocalWeather() {
  AMapLoader.load({
    key: "768647addab3397e7c3ffc3ccf4b2b42", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.CitySearch", "AMap.Weather"] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap) => {
    AMap.plugin("AMap.CitySearch", function() {
      let citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(function(status, result) {
        if (status === "complete" && result.info === "OK") {
          // 查询成功，result即为当前所在城市信息
          // console.log(result);
          AMap.plugin("AMap.Weather", function() {
            //创建天气查询实例
            const weather = new AMap.Weather();
            //执行实时天气信息查询
            weather.getLive(result.adcode, function(err, result) {
              // console.table(result);
              data.weather = result;
              data.isTrue = true;
            });
          });
        }
      });
    });
  }).catch(e => {
    console.log("Amap 报错 -->", e);
  });
}

const data = reactive({
  weather: "",
  isTrue: false
});
</script>

<template>
  <div v-show="data.isTrue" class="weather_Group">
    <div class="weather_info">
      <div class="weather_div">{{ data.weather.temperature ? data.weather.temperature + "℃" : "" }}</div>
      <div class="weather_div">{{ data.weather.weather }}</div>
      <div class="weather_div">{{ data.weather.windDirection ? data.weather.windDirection + "风" : "" }}</div>
    </div>
    <div class="weather_city">
      <div>
        <el-icon class="location_icon" :size="12">
          <Location />
        </el-icon>
      </div>
      <div>
        {{ data.weather.city ? data.weather.city : "" }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.weather_Group {
  display: flex;
  flex-direction: column;
}

.weather_info {
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: baseline;
}

.weather_div {
  height: 22px;
  padding-right: 8px;
  font-weight: bold;
  color: rgba(0, 0, 0, .75);
}

.weather_city {
  height: 18px;
  font-size: 12px;
  color: rgba(0, 0, 0, .5);
  display: flex;
  align-items: baseline;
}

.location_icon {
  margin-right: 4px;
  color: rgba(0, 0, 0, .4);
}
</style>