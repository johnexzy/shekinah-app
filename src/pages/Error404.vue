
<template>
  <q-page class="container">
    <q-card class="card w-100" flat square>

      <q-card-section class="q-pa-lg">
        <h4 class="tt text-weight-bold text-capitalize">Not found</h4>
        <span class="liner"></span>
      </q-card-section>
      <q-card-section class="q-pa-lg">
        <div class=" text-center q-pa-md flex flex-center">
          <div>
            <div style="font-size: 30vh">404</div>

            <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

            <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/" label="Go Home" no-caps />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data() {
    return {

    }
  }
}
</script>
