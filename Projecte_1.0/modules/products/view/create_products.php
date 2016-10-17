<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/3.51/jquery.form.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.0.1/min/dropzone.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.0.1/dropzone.css">
<!-- Script with absolute route -->
<script type="text/javascript" src="modules/products/view/js/products.js" ></script>

	<section id="main">
	<div class="inner">
		<header class="major special">	 	
		 <h1>New Product:</h1>
		</header>
		 <form name="alta_products" id="alta_products">
		 	<div class="field half first">
							<label for="id_prod">ID product</label>
							<input name="id_prod" placeholder="Id product" type="text" id="id_prod" required="required" value="" >
	                        <div id="e_id_prod"></div>
					
			</div>
			<div class="field half">
							<label for="prod_name">Product name</label>
							<input input name="prod_name" placeholder="Product name" type="text" id="prod_name" value="" >
	                        <div id="e_prod_name"></div>
			</div>
			<div class="field half first">
							<label for="price">Price</label>
							<input name="price" placeholder="Price" type="text" id="price" value="" >
	                        <div id="e_price"></div>
			</div>
			<div class="field half">
							<label for="country">Country of origin</label>
							<select name="country" id="country">
								<option value="Espanya">España</option>
								<option value="Francia">Francia</option>
								<option value="Italia">Italia</option>
								<option value="Alemania">Alemania</option>
			  				</select>
			</div>
			<div class="field half first">
							<label for="province">Province</label>
							<select name="province" id="province">
								<option value="Alicante">Alicante</option>
								<option value="Barcelona">Barcelona</option>
								<option value="Madrid">Madrid</option>
								<option value="Valencia">Valencia</option>
			  				</select>
			</div>
			<div class="field half ">
							<label for="population">Population</label>
							<select name="population" id="population">
								<option value="Alcoy">Alcoy</option>
								<option value="Algemesi">Algemesi</option>
								<option value="Bocairent">Bocairent</option>
								<option value="Ontinyent">Ontinyent</option>
			  				</select>
			</div>
			<div class="field half first">
							<label for="dis_date">Discharge date</label>
							<input name="dis_date" placeholder="mm/dd/yyyy" type="text" id="dis_date" value="">
	                        <div id="e_dis_date"></div>
			</div>
			<div class="field half">
							<label for="exp_date">Date of expire</label>
							<input name="exp_date" placeholder="mm/dd/yyyy" type="text" id="exp_date"  value="">
	                        <div id="e_exp_date"></div>
			</div>
			<label for="status1" >Product status</label>
			<div class="4u 12u$(xsmall)">
				
							<input type="radio" value="New" id="status1" name="status_prod" checked>
							<label for="status1">New</label>
							
							<input type="radio" value="Preowned" id="status2" name="status_prod">
							<label for="status2">Preowned</label>
							
							<input type="radio" value="Repair" id="status3" name="status_prod">
							<label for="status3">Repair</label>
			</div>
					<label for="dropzone">Dropzone</label>
                    <div class="form-group" id="progress">
                        <div id="bar"></div>
                        <div id="percent">0%</div >
                    </div>
                    <div class="msg"></div>
                    <br/>
                    <div id="dropzone" class="dropzone"></div><br/>
                    <br/>
                    <br/>
			<button class="button special" type="button" id="submit_product" name="submit_product" 
			class="btn btn-primary btn-lg" value="submit">Submit Product</button>
		</form>
	</<div>
	</section>