<script setup>
import router from '@/router';
</script>
<template>
    <div class="toolbar-wrapper">
        <div class="toolbar">
            <div class="logo" @click="router.push({name: 'main'})">
                <svg width="89" height="126" viewBox="0 0 89 126" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="44.5" cy="82" rx="44.5" ry="44" fill="#00A4FF"/>
<path d="M65.9544 90.0754C66.5483 90.6529 67.4979 90.6396 68.0755 90.0457L77.4868 80.367C78.0643 79.7731 78.051 78.8234 77.4571 78.2459C76.8632 77.6683 75.9135 77.6816 75.336 78.2756L66.9704 86.8788L58.3671 78.5132C57.7732 77.9357 56.8235 77.949 56.246 78.5429C55.6685 79.1368 55.6818 80.0865 56.2757 80.664L65.9544 90.0754ZM28.8256 68.2524C38.4846 61.886 47.542 60.7961 54.1038 64.1656C60.641 67.5224 65.3126 75.6244 65.5002 89.021L68.4999 88.979C68.304 74.9894 63.3859 65.5595 55.4742 61.4968C47.5869 57.4468 37.3361 59.05 27.1746 65.7475L28.8256 68.2524Z" fill="white" fill-opacity="0.99"/>
<path d="M24.4596 75.9351C23.8715 75.3517 22.9217 75.3555 22.3383 75.9436L12.8307 85.5277C12.2473 86.1159 12.2511 87.0656 12.8392 87.649C13.4274 88.2325 14.3771 88.2287 14.9605 87.6405L23.4117 79.1213L31.931 87.5725C32.5191 88.1559 33.4688 88.1521 34.0523 87.564C34.6357 86.9758 34.6319 86.0261 34.0438 85.4427L24.4596 75.9351ZM61.3685 98.128C51.6463 104.398 42.5784 105.397 36.0507 101.962C29.5473 98.54 24.9569 90.3917 24.9032 76.994L21.9032 77.006C21.9593 90.9968 26.7829 100.475 34.6537 104.617C42.5001 108.746 52.7664 107.245 62.9944 100.649L61.3685 98.128Z" fill="white" fill-opacity="0.99"/>
<path d="M57 14C49.6473 16.8609 47.4851 19.8068 45 26C42.8925 19.6313 40.1717 17.0649 33 14C39.901 11.0577 42.8791 8.70641 45 2C47.8206 9.20875 50.5977 11.6338 57 14Z" fill="#00A4FF" stroke="#00A4FF"/>
<path d="M77 26C72.7109 27.6689 71.4496 29.3873 70 33C68.7706 29.2849 67.1835 27.7879 63 26C67.0256 24.2837 68.7628 22.9121 70 19C71.6453 23.2051 73.2653 24.6197 77 26Z" fill="#00A4FF" stroke="#00A4FF"/>
<path d="M27 26C22.7109 27.6689 21.4496 29.3873 20 33C18.7706 29.2849 17.1835 27.7879 13 26C17.0256 24.2837 18.7628 22.9121 20 19C21.6453 23.2051 23.2653 24.6197 27 26Z" fill="#00A4FF" stroke="#00A4FF"/>
</svg>

            </div>
            <div class="search">
                <div class="search-logo"><ion-icon name="search-outline" size="medium"></ion-icon></div>
                <div class="search-area" contenteditable="true">
                    Search for people you know!...
                </div>
            </div>


            <div class="misc">
                <ion-icon name="chatbubbles-outline" size="large"></ion-icon>
                <ion-icon name="notifications-outline" size="large"></ion-icon>
                <img src="../assets/img/userplaceholder.jpg" alt="placeholder" class="profile-pic">
            </div>
        </div>
    </div>
</template>
<style scoped>

    .toolbar-wrapper{
        background-color: #fff;
        
    }
    .toolbar{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        place-items: center;
        height: 5rem;
    }
    .search{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #e9e9e9;
        border-radius:15px;
        width: 100%;

    }
    .search-logo{
        padding: 10px;
        margin-top: 3px;
    }
    .search-area{
        height: 3rem;
        width: 100%;
        display: flex;
        align-items: center;
        padding-left: 5px;
        color: #9f9f9f;
    }
    .search-area:focus{
        outline: none;
        color: black;
    }
    .logo{
        display: flex;
        align-items: start;
        width: 100%;
        cursor: pointer;
    }
    svg{
        height: 4rem;
    }
    .profile-pic{
        height: 3rem;
        border-radius: 50%;
        cursor: pointer;
    }

    .misc{
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 1rem;
        width: 100%;
        padding-right: 2rem;
    }
    .misc > * {
        cursor: pointer;
    }

</style>