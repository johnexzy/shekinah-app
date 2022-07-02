<template>
    <q-page class="bg-blue-1">
        <section class="q-py-xl">
            <div class="container">
                <div class="row q-col-gutter-md">
                    <div class="col-12 col-md-3 col-lg-3">
                        <div class="q-mb-xl">
                            <div class="flex">
                                <q-avatar size="100px">
                                    <q-img style="width: 100px; height: 100px;" src="https://www.upwork.com/profile-portraits/c1sX_XP84aJlcJyUUEowRkS9zPmeoInf0zZRpXmu7uqFBaFBm6dUo2_cLwNLdWJKQn"/>
                                </q-avatar>
                            </div>
                            <div class="text-h6 text-weight-bold text-default">Thabo Mbeki</div>
                            <div class="text-caption text-default">Head of Content @ leccel  Africa (or, in plain English, I'm the guy responsible for ensuring that every blog post we publish is EPIC).</div>
                            <ul class="flex q-pl-none" style="list-style: none;">
                                <li><q-btn round flat text-color="grey-10" icon="share"/></li>
                                <li><q-btn round flat text-color="grey-10" icon="attach_file"/></li>
                                <li><q-btn round flat text-color="grey-10" icon="mail_outline"/></li>
                            </ul>
                        </div>

                        <div class="q-mt-xl">
                            <div class="row q-col-gutter-md items-center">
                                <Newsletter></Newsletter>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-9 col-lg-9">
                        <div class="row q-col-gutter-lg">
                            <div v-for="i in 8" :key="i" class="col-12 col-md-6 col-lg-6 q-mb-xl">
                                <div class="text-caption text-para-default">NEWS</div>
                                <div class="text-h6 text-weight-bold text-default">How to Implement the 4 Ps of Marketing</div>
                                <div class="text-caption text-para-default q-my-sm">Learn all about the important new features and changes in Ahrefs last month.</div>
                                <div class="row">
                                    <div class="col-12 col-md-10 col-lg-10">
                                        <q-list>
                                            <q-item class="q-pa-none">
                                                <q-item-section avatar>
                                                    <q-avatar size="40px">
                                                        <q-img style="width: 50px; height: 50px;" src="https://www.upwork.com/profile-portraits/c1sX_XP84aJlcJyUUEowRkS9zPmeoInf0zZRpXmu7uqFBaFBm6dUo2_cLwNLdWJKQn" />
                                                    </q-avatar>
                                                </q-item-section>
                                                <q-item-section>Amarachi Okonkwo</q-item-section>
                                                <q-item-section side>August 31, 2021.</q-item-section>
                                            </q-item>
                                        </q-list>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <q-btn unelevated color="grey-5" label="View more" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="q-py-xl bg-white">
            <div class="container">
                <div class="row q-col-gutter-lg">
                    <div class="col-12 col-md-6 col-lg-6">
                        <div class="text-h5 text-default text-weight-bold">Get access to more features</div>
                        <div class="text-caption text-default">Get deeper insights and access to more with our Pro plan</div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 flex items-center">
                        <q-btn label="Try Pro for free" no-caps unelevated color="primary" />
                    </div>
                </div>
            </div>
        </section>
    </q-page>
</template>

<script>
import Newsletter from '../../components/Newsletter'
export default({
    data() {
        return{
            tab: 'news'
        }
    },
    components: {
       Newsletter
    }
})
</script>

<style>
    .blog-category-tab{
        display: flex;
        justify-content: flex-start;
    }
    .blog-category-tab .q-tab__indicator{
        display: none;
    }
     .blog-category-tab .q-tab__content .q-tab__label{
        font-size: 1.5rem!important;
        font-weight: bold;
    }
</style>
