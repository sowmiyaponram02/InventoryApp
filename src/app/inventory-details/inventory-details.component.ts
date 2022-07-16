import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { InventoryDetail } from '../shared/inventory-detail.model';
import { InventoryDetailService } from '../shared/inventory-detail.service';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.scss']
})
export class InventoryDetailsComponent implements OnInit {

  constructor(private formbuilder:FormBuilder,public service:InventoryDetailService) { }

  itemObj:InventoryDetail=new InventoryDetail();
  code = ['',Validators.required];
  name = ['',Validators.required];
  quantity = ['',Validators.required];
  unitPrice = ['',Validators.required];
  inventoryForm !:FormGroup;
  listItems:InventoryDetail[]=[];
  showAdd !:boolean ;
  showUpdate !:boolean;
  
  ngOnInit(): void {
    this.inventoryForm = this.formbuilder.group({
      code:this.code,
      name:this.name,
      quantity:this.quantity,
      unitPrice:this.unitPrice
    });
    this.getAllDetails();
  }
  
  onAddDetail(){
    this.showAdd = true;
    this.showUpdate = false;
    this.inventoryForm.reset();
    this.itemObj=new InventoryDetail();
    
  }
  AddItemDetails(){
    this.itemObj.code = this.inventoryForm.value.code;
    this.itemObj.name=this.inventoryForm.value.name;
    this.itemObj.quantity = this.inventoryForm.value.quantity;
    this.itemObj.unitPrice = this.inventoryForm.value.unitPrice;
    this.service.AddItemToInventory(this.itemObj).subscribe(
      res=>{
       alert("Ïtem added Successfully");
       let val = document.getElementById('cancel');
       val?.click();
       this.inventoryForm.reset();
       this.getAllDetails();
      },
      err=>{
        alert("Some error happened");
        console.log(err);
      }
    )
  }

  getAllDetails(){
    this.service.GetAllItems().subscribe(
      res=>{
        this.listItems = res;
      }
    )
  }

  onEdit(item : InventoryDetail){
    this.showAdd = false;
    this.showUpdate=true;
    this.itemObj.id = item.id;
    this.inventoryForm.controls['code'].setValue(item.code);
    this.inventoryForm.controls['name'].setValue(item.name);
    this.inventoryForm.controls['unitPrice'].setValue(item.unitPrice);
    this.inventoryForm.controls['quantity'].setValue(item.quantity);
  }

  DeleteItem(id:number){
    this.service.DeleteItem(id).subscribe(
      res=>{
        alert("deleted successfully");
        this.getAllDetails();
      },
      err=>{
        alert("some error happened");
      }
    )
  }

  UpdateItemDetails(){
    this.itemObj.code = this.inventoryForm.value.code;
    this.itemObj.name=this.inventoryForm.value.name;
    this.itemObj.quantity = this.inventoryForm.value.quantity;
    this.itemObj.unitPrice = this.inventoryForm.value.unitPrice;
    this.service.UpdateItem(this.itemObj.id,this.itemObj).subscribe(
      res=>{
       alert("Ïtem updated Successfully");
       let val = document.getElementById('cancel');
       val?.click();
       this.inventoryForm.reset();
       this.getAllDetails();
      },
      err=>{
        alert("Some error happened");
        console.log(err);
      }
    )
  }
}
