$(document).ready(function(){
	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();
	
	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function(){
		if(this.checked){
			checkbox.each(function(){
				this.checked = true;                        
			});
		} else{
			checkbox.each(function(){
				this.checked = false;                        
			});
		} 
	});
	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);
		}
	});

	$('table .delete').click(function(){
		var id = $(this).parent().find("#id").val();
		$('#deleteOrderModal form').attr("action", "/delete-calculator/" + id);
	});

	$('table .edit').click(function(){
		var id = $(this).parent().find("#id").val();
		$.ajax({
			type: "GET",
			url: "/api/calculator/find/" + id,
			success: function(calculator) {
				$("#editOrderModal #id").val(calculator.id);
				$("#editOrderModal #pipValuePerLot.id").val(calculator.pipValuePerLot.id);
				$("#editOrderModal #stopLoss").val(calculator.stopLoss);
				$("#editOrderModal #entry").val(calculator.entry);
				$("#editOrderModal #takeProfit").val(calculator.takeProfit);
				$("#editOrderModal #amoutToRisk").val(calculator.amoutToRisk);
			}
		});
	});

	$('table .btn-win').click(function(){
		$(this).parent().parent().find(".div-btn-result").css("display","none");
		var divInputResult = $(this).parent().parent().find(".div-input-result");
		divInputResult.css("display", "block");
		divInputResult.find('input').css("border-color", "green");
		divInputResult.find('input').attr("result","tp");
	});
	
	$('table .btn-lose').click(function(){
		$(this).parent().parent().find(".div-btn-result").css("display","none");
		var divInputResult = $(this).parent().parent().find(".div-input-result");
		divInputResult.css("display", "block");
		divInputResult.find('input').css("border-color", "red");
		divInputResult.find('input').attr("result","sl");
	});

	$('table .div-input-result input').change(function(){
		var tr = $(this).parent().parent().parent();
		var id = tr.find("#id").val();
		var value = $(this).val();
		if(tr.find(".div-input-result input").attr("result") == "sl") {
			value = -1*value;
		}

		$.ajax({
			type: "POST",
			url: "/api/calculator/updateResult/"+id +"?result="+ value,
			success: function() {
				location.reload();
			}
		});
	});

	$('.div-result-tp, .div-result-sl').dblclick(function(){
		$(this).css("display", "none");
		$(this).parent().find(".div-btn-result").css("display", "block");
	});
});