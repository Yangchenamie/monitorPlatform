<template>
    <div class="container">
        <div class="header">
            <div></div>
            <span>订单情况</span>
            <div class="divfr"></div>
            <div class="divfr" style="right: -4px;"></div>
        </div>
        <div class="content">
            <table>
                <tr>
                    <th>时间</th>
                    <th>机器编号</th>
                    <th>订单额/元</th>
                </tr>
                <tr>
                    <td>2023.01.01 12:30:05</td>
                    <td>39380104</td>
                    <td>234</td>
                </tr>
                <tr>
                    <td>2023.01.01 14:30:05</td>
                    <td>38806104</td>
                    <td>345</td>
                </tr>
                <tr>
                    <td>2023.01.02 12:30:05</td>
                    <td>91806104</td>
                    <td>456</td>
                </tr>
                <tr>
                    <td>2023.01.02 15:30:05</td>
                    <td>81806104</td>
                    <td>432.5</td>
                </tr>
            </table>
        </div>
    </div>
</template>


<script setup lang="ts">

</script>

<style scoped lang="less">
.container {
    width: 100%;
    min-width: 320px;

    .header {
        // width: 650px;
        width: 95%;
        position: relative;
        text-align: left;
        border-bottom: 1px solid rgba(0, 218, 216, 1);

        >span {
            display: inline-block;
            border-bottom: 1px solid rgba(0, 218, 216, 1);
            line-height: 35px;
            padding: 0 5px;
        }

        >div {
            content: '';
            width: 2px;
            height: 7px;
            background-color: rgba(0, 218, 216, 1);
            position: absolute;
            bottom: -3px;

        }

        .divfr {
            right: 0;
        }
    }

    .content {
        width: 100%;

        >table {
            border-collapse: collapse;
            width: 90%;
            // display: flex;
            // justify-content: space-between;

            th {
                color: rgba(0, 218, 216, 1);
                font-size: 18px;
                text-align: left;
                font-weight: 400;
                line-height: 60px;
                margin: 0 30px;
                padding-right: 20px;
                flex:1;
            }

            td {
                text-align: left;
                height: 38px;
                padding-right: 18px;
                line-height: 38px;
                padding-left: 10px;
                border: none;
            }

            tr {
                width: 100%;
            }

            tr:nth-child(even) {
                background-color: rgba(0, 72, 91, 1);
            }

        }
    }


}
</style>