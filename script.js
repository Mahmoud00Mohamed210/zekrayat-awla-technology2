/* ===========================
   زر OPEN وشاشة البداية
=========================== */

const openBtn = document.getElementById("openBtn");
const splash = document.getElementById("splash-screen");
const website = document.getElementById("website");

if (openBtn) {

    openBtn.addEventListener("click", function () {

        openBtn.classList.add("open-animation");

        setTimeout(() => {

            if (splash) {
                splash.classList.add("fade-out");
            }

        }, 500);

        setTimeout(() => {

            if (splash) {
                splash.style.display = "none";
            }

            if (website) {
                website.style.display = "block";
            }

            document.body.style.overflowX = "hidden";
            document.body.style.overflowY = "auto";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 1500);

    });

}


/* ===========================
   ❤️ عداد الذكريات
=========================== */

const startDate = new Date("2025-10-06T00:00:00");

function updateLoveCounter() {

    const now = new Date();

    let months =
        (now.getFullYear() - startDate.getFullYear()) * 12;

    months +=
        now.getMonth() - startDate.getMonth();

    if (
        now.getDate() < startDate.getDate() ||
        (
            now.getDate() === startDate.getDate() &&
            (
                now.getHours() < startDate.getHours() ||
                (
                    now.getHours() === startDate.getHours() &&
                    now.getMinutes() < startDate.getMinutes()
                ) ||
                (
                    now.getHours() === startDate.getHours() &&
                    now.getMinutes() === startDate.getMinutes() &&
                    now.getSeconds() < startDate.getSeconds()
                )
            )
        )
    ) {
        months--;
    }

    const diff = now - startDate;

    const days =
        Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours =
        Math.floor(
            (diff % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (diff % (1000 * 60 * 60)) /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (diff % (1000 * 60)) /
            1000
        );

    if (document.getElementById("month"))
        document.getElementById("month").textContent = months;

    if (document.getElementById("days"))
        document.getElementById("days").textContent = days;

    if (document.getElementById("hours"))
        document.getElementById("hours").textContent = hours;

    if (document.getElementById("minutes"))
        document.getElementById("minutes").textContent = minutes;

    if (document.getElementById("seconds"))
        document.getElementById("seconds").textContent = seconds;

}

updateLoveCounter();

setInterval(updateLoveCounter, 1000);


/* ===========================
   📸 تكبير الصور
=========================== */

const images =
    document.querySelectorAll(".photo-stack img");

images.forEach(img => {

    img.addEventListener("click", () => {

        if (img.classList.contains("zoom")) {

            img.classList.remove("zoom");

        } else {

            images.forEach(i =>
                i.classList.remove("zoom")
            );

            img.classList.add("zoom");

        }

    });

});


/* ===========================
   🖼️ معرض الصور
=========================== */

const galleryImages =
    document.querySelectorAll(".cards-gallery img");

const viewer =
    document.getElementById("imageViewer");

const bigImage =
    document.getElementById("bigImage");

const closeImage =
    document.getElementById("closeImage");

galleryImages.forEach(img => {

    img.onclick = function () {

        if (!viewer || !bigImage) return;

        viewer.style.display = "flex";

        bigImage.src = this.src;

    };

});

if (closeImage) {

    closeImage.onclick = function () {

        viewer.style.display = "none";

    };

}

if (viewer) {

    viewer.onclick = function (e) {

        if (e.target === viewer) {

            viewer.style.display = "none";

        }

    };

}


/* ===========================
   🎵 Playlist الموسيقى
=========================== */

const bgMusic =
    document.getElementById("bgMusic");

const playlist = [

    "audio/music1.mp3",
    "audio/music2.mp3",
    "audio/music3.mp3"

];

let currentMusic = 0;


/* حالة كتم الأغاني فقط */

let musicMuted = false;


/* تشغيل الأغنية */

function playMusic() {

    if (!bgMusic) return;

    /* لو الأغاني مكتومة لا نشغلها */

    if (musicMuted) return;

    bgMusic.src = playlist[currentMusic];

    bgMusic.muted = false;

    bgMusic.play().catch(() => {});

}


/* بعد الضغط على OPEN */

if (openBtn) {

    openBtn.addEventListener("click", function () {

        setTimeout(function () {

            playMusic();

        }, 1500);

    });

}


/* الأغنية خلصت */

if (bgMusic) {

    bgMusic.addEventListener("ended", function () {

        currentMusic++;

        if (currentMusic >= playlist.length) {

            currentMusic = 0;

        }

        playMusic();

    });

}


/* ===========================
   🔇 زر كتم الأغاني فقط
=========================== */

const musicToggle =
    document.getElementById("musicToggle");

if (musicToggle) {

    musicToggle.addEventListener("click", function () {

        musicMuted = !musicMuted;

        if (musicMuted) {

            /* كتم الأغاني فقط */

            if (bgMusic) {
                bgMusic.pause();
            }

            musicToggle.textContent = "🔇";

        } else {

            /* تشغيل الأغاني فقط */

            musicToggle.textContent = "🔊";

            /*
               الريكورد لو شغال
               ما نشغلش الأغنية
            */

            if (
                !voiceMessage ||
                voiceMessage.paused
            ) {

                playMusic();

            }

        }

    });

}


/* ===========================
   🎙️ الرسالة الصوتية
=========================== */

const playVoice =
    document.getElementById("playVoice");

const voiceMessage =
    document.getElementById("voiceMessage");

const voiceWave =
    document.querySelector(".voice-wave");

const voiceTime =
    document.getElementById("voiceTime");

let voicePlaying = false;


if (playVoice && voiceMessage) {

    playVoice.addEventListener("click", function () {

        /* إيقاف الريكورد */

        if (!voiceMessage.paused) {

            voiceMessage.pause();

            playVoice.textContent = "▶";

            if (voiceWave) {

                voiceWave.classList.remove("playing");

            }

            voicePlaying = false;

            /*
               رجع الأغنية فقط لو
               المستخدم مش كاتمها
            */

            if (!musicMuted) {

                playMusic();

            }

            return;

        }


        /* تشغيل الريكورد */

        /*
           وقف الأغنية
           بدون تغيير حالة الكتم
        */

        if (bgMusic) {

            bgMusic.pause();

        }

        voiceMessage.muted = false;

        voiceMessage.play().catch(() => {});

        playVoice.textContent = "❚❚";

        if (voiceWave) {

            voiceWave.classList.add("playing");

        }

        voicePlaying = true;

    });


    /* تحديث وقت الريكورد */

    voiceMessage.addEventListener("timeupdate", function () {

        if (!voiceTime) return;

        let minutes =
            Math.floor(
                voiceMessage.currentTime / 60
            );

        let seconds =
            Math.floor(
                voiceMessage.currentTime % 60
            );

        if (seconds < 10) {

            seconds = "0" + seconds;

        }

        voiceTime.textContent =
            minutes + ":" + seconds;

    });


    /* الريكورد خلص */

    voiceMessage.addEventListener("ended", function () {

        playVoice.textContent = "▶";

        if (voiceWave) {

            voiceWave.classList.remove("playing");

        }

        voicePlaying = false;

        voiceMessage.currentTime = 0;

        if (voiceTime) {

            voiceTime.textContent = "0:00";

        }

        /*
           رجع الأغنية فقط لو
           المستخدم مش كاتمها
        */

        if (!musicMuted) {

            playMusic();

        }

    });

}


/* ===========================
   🎬 جميع الفيديوهات
=========================== */

const allVideos =
    document.querySelectorAll("video");


allVideos.forEach(function (video) {


    /* تشغيل فيديو */

    video.addEventListener("play", function () {

        /*
           إيقاف الأغنية
        */

        if (bgMusic) {

            bgMusic.pause();

        }


        /*
           إيقاف الريكورد
        */

        if (
            voiceMessage &&
            !voiceMessage.paused
        ) {

            voiceMessage.pause();

            if (playVoice) {

                playVoice.textContent = "▶";

            }

            if (voiceWave) {

                voiceWave.classList.remove("playing");

            }

            voicePlaying = false;

        }


        /*
           تشغيل فيديو واحد فقط
        */

        allVideos.forEach(function (otherVideo) {

            if (otherVideo !== video) {

                otherVideo.pause();

            }

        });

    });


    /* الفيديو اتوقف */

    video.addEventListener("pause", function () {

        const playingVideo =
            Array.from(allVideos).some(
                v => !v.paused
            );


        /*
           رجع الأغنية فقط إذا:
           - مفيش فيديو شغال
           - مفيش ريكورد شغال
           - الأغاني مش مكتومة
        */

        if (
            !playingVideo &&
            (!voiceMessage || voiceMessage.paused) &&
            !musicMuted
        ) {

            playMusic();

        }

    });


    /* الفيديو خلص */

    video.addEventListener("ended", function () {

        const playingVideo =
            Array.from(allVideos).some(
                v => !v.paused
            );


        if (
            !playingVideo &&
            (!voiceMessage || voiceMessage.paused) &&
            !musicMuted
        ) {

            playMusic();

        }

    });

});


/* ===========================
   🔝 أزرار التنقل
=========================== */

const topBtn =
    document.getElementById("scrollTopBtn");

const bottomBtn =
    document.getElementById("scrollBottomBtn");

if (topBtn) {

    topBtn.onclick = function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

}

if (bottomBtn) {

    bottomBtn.onclick = function () {

        window.scrollTo({

            top: document.body.scrollHeight,

            behavior: "smooth"

        });

    };

}