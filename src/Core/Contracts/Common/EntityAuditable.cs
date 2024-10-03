﻿namespace Contracts.Common;

public class EntityAuditable
{
    public DateTime CreatedDate { get; set; }
    public DateTime? LastModifiedDate { get; set; }
    public string CreatedBy { get; set; }
    public string? ModifiedBy { get; set; }
}
