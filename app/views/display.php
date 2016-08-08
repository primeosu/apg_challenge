<!DOCTYPE html>
<html>

  <head>
      <meta charset="utf-8">
      <meta name="author" content="Kyle Belanger">
      <title>Intel Security Challenge</title>
      <link rel="stylesheet" type="text/css" href="../assets/css/style.css">
  </head>

  <body>
      <header>
          <h2>Intel Security</h2>
          <p>Web development example for normalizing data in a CSV file.</p>
      </header>

      <hr>

      <section>
          <p>Upload complete. Please use the option below to filter the data.</p>

          <form>
                <input oninput="queryData(this.value)" type="text" placeholder="Filter data">
          </form>

          <section id="malware">
              <!-- parsed data -->
          </section>

      </section>
  </body>

  <script src="../assets/js/actions.js">
  </script>

</html>
