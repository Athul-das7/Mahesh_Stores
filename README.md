# Mahesh_Stores

            <form action="/admin/ordered/<%= order[0] %>" method="POST" >
              <% const arr = order[3].split(',') %> 
              <% arr.forEach( item =>{ %> 
              <div class="form-group dropdown-item">
                <input type="text" autocomplete="off" class="form-control" placeholder="<%= item %>" name="compList">
              </div>
              <% }) %> 
              <button name="transId" value="<%= order[4] %>" class="btn btn-success">Submit</button>
            </form>